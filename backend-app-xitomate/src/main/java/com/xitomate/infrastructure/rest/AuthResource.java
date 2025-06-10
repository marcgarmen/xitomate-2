package com.xitomate.infrastructure.rest;

import com.xitomate.domain.entity.User;
import com.xitomate.domain.enums.UserRole;
import com.xitomate.service.PasswordService;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @Inject
    EntityManager entityManager;

    @Inject
    PasswordService passwordService;

    @POST
    @Path("/login")
    public Response login(@QueryParam("email") String email, @QueryParam("password") String password) {
        try {
            if (email == null || password == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Email and password are required");
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(error)
                        .build();
            }

            User user = entityManager.createQuery(
                "SELECT u FROM User u WHERE u.email = :email", User.class)
                .setParameter("email", email)
                .getResultList()
                .stream()
                .findFirst()
                .orElse(null);

            if (user == null || !passwordService.verifyPassword(password, user.passwordSalt, user.passwordHash)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid credentials");
                return Response.status(Response.Status.UNAUTHORIZED)
                        .entity(error)
                        .build();
            }

            Map<String, Object> response = new HashMap<>();
            response.put("token", user.id);
            response.put("role", user.role.name());
            response.put("userId", user.id);
            return Response.ok(response).build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error during login: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(error)
                    .build();
        }
    }

    @OPTIONS
    @Path("/login")
    public Response loginOptions() {
        return Response.ok().build();
    }
} 
