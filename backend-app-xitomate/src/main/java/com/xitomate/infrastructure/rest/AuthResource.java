package com.xitomate.infrastructure.rest;

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
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid credentials");
                return Response.status(Response.Status.UNAUTHORIZED)
                        .entity(error)
                        .build();
            }

            // Create a simple token using the user's ID
            String token = String.valueOf(user.id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("email", user.email);
            response.put("role", user.role.toString());
            response.put("userId", user.id);
            
            return Response.ok(response).build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error during authentication: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(error)
                    .build();
        }
    }
} 