package com.xitomate.config;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import jakarta.ws.rs.ext.Provider;
import java.io.IOException;
import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class FirebaseAuthFilter implements ContainerRequestFilter {

    private static final List<String> PUBLIC_PATHS = Arrays.asList(
        "/users/register",
        "/users/test-data",
        "/auth/login",
        "/q/health",
        "/q/openapi"
    );

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
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token, true);
            String email = decodedToken.getEmail();
            
            // Create a new SecurityContext with the user's email as the principal
            SecurityContext securityContext = new SecurityContext() {
                @Override
                public Principal getUserPrincipal() {
                    return () -> email;
                }

                @Override
                public boolean isUserInRole(String role) {
                    return true; // You can implement role checking here if needed
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
            
        } catch (FirebaseAuthException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid token: " + e.getMessage());
            ctx.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                    .entity(error)
                    .build());
        }
    }
}
