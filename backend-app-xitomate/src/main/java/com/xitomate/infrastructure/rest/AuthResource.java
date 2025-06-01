package com.xitomate.infrastructure.rest;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.xitomate.domain.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @jakarta.inject.Inject
    EntityManager entityManager;

    private String generateUid(String email) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(email.getBytes("UTF-8"));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(hash).substring(0, 28);
        } catch (Exception e) {
            return email.substring(0, Math.min(email.length(), 28));
        }
    }

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

            // Generate a short UID from the email
            String uid = generateUid(email);
            
            // Create a custom token using the generated UID
            String customToken = FirebaseAuth.getInstance().createCustomToken(uid);
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", customToken);
            response.put("email", user.email);
            response.put("role", user.role.toString());
            response.put("userId", user.id);
            
            return Response.ok(response).build();
        } catch (FirebaseAuthException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error with Firebase authentication: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(error)
                    .build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error during authentication: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(error)
                    .build();
        }
    }
} 