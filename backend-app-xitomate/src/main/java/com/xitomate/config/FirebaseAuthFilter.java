package com.xitomate.config;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import java.io.IOException;
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
            // For now, we'll just verify that the token was created by our Firebase project
            // In a production environment, you should implement proper token verification
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token, true);
            ctx.setProperty("userEmail", decodedToken.getEmail());
            ctx.setProperty("firebaseUid", decodedToken.getUid());
        } catch (FirebaseAuthException e) {
            // If token verification fails, we'll still allow the request to proceed
            // This is not secure for production, but helps during development
            ctx.setProperty("userEmail", "test@example.com");
            ctx.setProperty("firebaseUid", "test-uid");
        }
    }
}
