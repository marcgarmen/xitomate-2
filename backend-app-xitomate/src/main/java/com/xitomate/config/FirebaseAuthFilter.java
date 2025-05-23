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
            abort(ctx);
            return;
        }
        String idToken = auth.substring(7);
        try {
            FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdToken(idToken);
            ctx.setProperty("firebaseUid", decoded.getUid());
        } catch (FirebaseAuthException e) {
            abort(ctx);
        }
    }

    private void abort(ContainerRequestContext ctx) {
        ctx.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
    }
}
