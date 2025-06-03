package com.xitomate.config;

import com.xitomate.domain.entity.User;
import jakarta.annotation.Priority;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import jakarta.ws.rs.ext.Provider;
import java.io.IOException;
import java.security.Principal;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Base64;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class FirebaseAuthFilter implements ContainerRequestFilter {

    @Inject
    EntityManager entityManager;

    private static final List<String> PUBLIC_PATHS = Arrays.asList(
        "/users/register",
        "/users/test-data",
        "/auth/login",
        "/q/health",
        "/q/openapi"
    );

    private String generateUid(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes("UTF-8"));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(hash).substring(0, 28);
        } catch (Exception e) {
            return token.substring(0, Math.min(token.length(), 28));
        }
    }

    @Override
    public void filter(ContainerRequestContext ctx) throws IOException {
        String path = ctx.getUriInfo().getPath();
        
        // Allow public paths
        if (PUBLIC_PATHS.stream().anyMatch(path::startsWith)) {
            return;
        }

        String auth = ctx.getHeaderString("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Missing or invalid Authorization header");
            ctx.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                    .entity(error)
                    .build());
            return;
        }

        String token = auth.substring(7);
        try {
            // Buscar el usuario por el token (que es el ID)
            User user = entityManager.find(User.class, Long.parseLong(token));
            if (user == null) {
                throw new RuntimeException("User not found");
            }

            // Permitir acceso a SUPPLIER y RESTAURANT para consulta de catálogo
            if (path.startsWith("/suppliers/")) {
                // Si es endpoint de catálogo, permitir a SUPPLIER y RESTAURANT
                if (path.matches("/suppliers/\\d+/catalog/?")) {
                    if (!user.role.name().equals("SUPPLIER") && !user.role.name().equals("RESTAURANT")) {
                        throw new RuntimeException("User is not authorized to view supplier catalog");
                    }
                } else {
                    // Para otros endpoints de suppliers, solo SUPPLIER
                    if (!user.role.name().equals("SUPPLIER")) {
                        throw new RuntimeException("User is not a supplier");
                    }
                    // Validar supplierId si aplica (por ejemplo, en endpoints de modificación)
                    String supplierId = ctx.getUriInfo().getPathParameters().getFirst("supplierId");
                    if (supplierId != null && !supplierId.equals(user.id.toString())) {
                        throw new RuntimeException("Unauthorized access to supplier resources");
                    }
                }
            }
            // AGREGADO: Verificar el rol para rutas de restaurante
            if (path.startsWith("/restaurant/")) {
                if (!user.role.name().equals("RESTAURANT")) {
                    throw new RuntimeException("User is not a restaurant");
                }
            }
            
            // Create a new SecurityContext with the user ID as the principal
            SecurityContext securityContext = new SecurityContext() {
                @Override
                public Principal getUserPrincipal() {
                    return () -> user.id.toString();
                }

                @Override
                public boolean isUserInRole(String role) {
                    return user.role.name().equals(role);
                }

                @Override
                public boolean isSecure() {
                    return ctx.getSecurityContext().isSecure();
                }

                @Override
                public String getAuthenticationScheme() {
                    return "Bearer";
                }
            };
            
            ctx.setSecurityContext(securityContext);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid token: " + e.getMessage());
            ctx.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                    .entity(error)
                    .build());
        }
    }
}
