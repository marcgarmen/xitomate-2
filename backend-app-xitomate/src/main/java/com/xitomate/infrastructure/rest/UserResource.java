package com.xitomate.infrastructure.rest;

import com.xitomate.domain.entity.User;
import com.xitomate.domain.enums.UserRole;
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

    @jakarta.inject.Inject
    EntityManager entityManager;

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
            entityManager.flush(); // Force flush to ensure the insert happens
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
            // Check if test users already exist
            User existingSupplier = entityManager.createQuery(
                "SELECT u FROM User u WHERE u.email = :email", User.class)
                .setParameter("email", "supplier@test.com")
                .getResultList()
                .stream()
                .findFirst()
                .orElse(null);

            User existingRestaurant = entityManager.createQuery(
                "SELECT u FROM User u WHERE u.email = :email", User.class)
                .setParameter("email", "restaurant@test.com")
                .getResultList()
                .stream()
                .findFirst()
                .orElse(null);

            Map<String, Object> response = new HashMap<>();
            
            if (existingSupplier == null) {
                // Create a test supplier
                User supplier = new User();
                supplier.email = "supplier@test.com";
                supplier.password = "password123";
                supplier.role = UserRole.SUPPLIER;
                supplier.nombre = "Test Supplier";
                supplier.ubicacion = "Test Location";
                entityManager.persist(supplier);
                entityManager.flush(); // Force flush to ensure the insert happens
                response.put("supplier", "created");
            } else {
                response.put("supplier", "already exists");
            }

            if (existingRestaurant == null) {
                // Create a test restaurant
                User restaurant = new User();
                restaurant.email = "restaurant@test.com";
                restaurant.password = "password123";
                restaurant.role = UserRole.RESTAURANT;
                restaurant.nombre = "Test Restaurant";
                restaurant.ubicacion = "Test Location";
                entityManager.persist(restaurant);
                entityManager.flush(); // Force flush to ensure the insert happens
                response.put("restaurant", "created");
            } else {
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