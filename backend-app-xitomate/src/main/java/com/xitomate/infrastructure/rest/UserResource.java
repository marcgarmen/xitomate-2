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

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    EntityManager entityManager;

    @Inject
    PasswordService passwordService;

    @POST
    @Path("/register")
    @Transactional
    public Response registerUser(User user) {
        try {
            // Check if user already exists
            User existingUser = entityManager.createQuery(
                "SELECT u FROM User u WHERE u.email = :email", User.class)
                .setParameter("email", user.email)
                .getResultList()
                .stream()
                .findFirst()
                .orElse(null);

            if (existingUser != null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "User with this email already exists");
                return Response.status(Response.Status.CONFLICT)
                        .entity(error)
                        .build();
            }

            entityManager.persist(user);
            return Response.ok(user).build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error registering user: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(error)
                    .build();
        }
    }

    @GET
    @Path("/test-data")
    @Transactional
    public Response createTestData() {
        try {
            Map<String, Object> response = new HashMap<>();
            
            // Create a test supplier
            User supplier = new User();
            supplier.email = "supplier@test.com";
            supplier.passwordSalt = passwordService.generateSalt();
            supplier.passwordHash = passwordService.hashPassword("password123", supplier.passwordSalt);
            supplier.role = UserRole.SUPPLIER;
            supplier.nombre = "Test Supplier";
            supplier.ubicacion = "Test Location";
            
            try {
                entityManager.persist(supplier);
                response.put("supplier", "created");
            } catch (Exception e) {
                response.put("supplier", "already exists");
            }

            // Create a test restaurant
            User restaurant = new User();
            restaurant.email = "restaurant@test.com";
            restaurant.passwordSalt = passwordService.generateSalt();
            restaurant.passwordHash = passwordService.hashPassword("password123", restaurant.passwordSalt);
            restaurant.role = UserRole.RESTAURANT;
            restaurant.nombre = "Test Restaurant";
            restaurant.ubicacion = "Test Location";
            
            try {
                entityManager.persist(restaurant);
                response.put("restaurant", "created");
            } catch (Exception e) {
                response.put("restaurant", "already exists");
            }

            return Response.ok(response).build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error creating test data: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(error)
                    .build();
        }
    }
} 