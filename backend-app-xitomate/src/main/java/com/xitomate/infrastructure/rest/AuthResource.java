package com.xitomate.infrastructure.rest;

import com.google.firebase.auth.FirebaseAuth;
import com.xitomate.domain.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @jakarta.inject.Inject
    EntityManager entityManager;

    @POST
    @Path("/login")
    public Response login(@QueryParam("email") String email, @QueryParam("password") String password) {
        try {
            // Find user by email
            User user = entityManager.createQuery(
                "SELECT u FROM User u WHERE u.email = :email", User.class)
                .setParameter("email", email)
                .getResultList()
                .stream()
                .findFirst()
                .orElse(null);

            if (user == null || !user.password.equals(password)) {
                return Response.status(Response.Status.UNAUTHORIZED)
                        .entity(Map.of("error", "Invalid credentials"))
                        .build();
            }

            // Create a custom token for the user
            String customToken = FirebaseAuth.getInstance().createCustomToken(email);
            
            Map<String, String> response = new HashMap<>();
            response.put("token", customToken);
            response.put("email", email);
            response.put("role", user.role.toString());
            
            return Response.ok(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(Map.of("error", "Invalid credentials"))
                    .build();
        }
    }
} 