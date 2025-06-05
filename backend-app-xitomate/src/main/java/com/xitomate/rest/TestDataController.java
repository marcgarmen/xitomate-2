package com.xitomate.rest;

import com.xitomate.domain.entity.*;
import com.xitomate.domain.enums.OrderStatus;
import com.xitomate.domain.enums.PaymentMethod;
import com.xitomate.domain.enums.UserRole;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Path("/test-data")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TestDataController {

    @Inject
    EntityManager entityManager;

    @POST
    @Path("/upload")
    @RolesAllowed("ADMIN")
    @Transactional
    public Response uploadTestData() {
        try {
            // Create a test supplier if it doesn't exist
            User supplier = entityManager.createQuery(
                "SELECT u FROM User u WHERE u.email = :email", User.class)
                .setParameter("email", "supplier@test.com")
                .getResultList()
                .stream()
                .findFirst()
                .orElseGet(() -> {
                    User newSupplier = new User();
                    newSupplier.email = "supplier@test.com";
                    newSupplier.password = "password123";
                    newSupplier.role = UserRole.SUPPLIER;
                    newSupplier.nombre = "Test Supplier";
                    newSupplier.ubicacion = "Test Location";
                    entityManager.persist(newSupplier);
                    return newSupplier;
                });

            // Create some test products
            List<SupplierProduct> products = List.of(
                createProduct(supplier, "Tomatoes", new BigDecimal("2.50"), "kg", 100),
                createProduct(supplier, "Onions", new BigDecimal("1.50"), "kg", 150),
                createProduct(supplier, "Potatoes", new BigDecimal("3.00"), "kg", 200),
                createProduct(supplier, "Chicken", new BigDecimal("8.00"), "kg", 50),
                createProduct(supplier, "Rice", new BigDecimal("4.00"), "kg", 300)
            );

            for (SupplierProduct product : products) {
                entityManager.persist(product);
            }

            return Response.ok(Map.of(
                "message", "Test data created successfully",
                "supplierId", supplier.id,
                "products", products.stream()
                    .map(p -> Map.of(
                        "id", p.id,
                        "nombre", p.nombre,
                        "precio", p.precio,
                        "unidad", p.unidad,
                        "stock", p.stock
                    ))
                    .collect(Collectors.toList())
            )).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }
    }

    private SupplierProduct createProduct(User supplier, String nombre, BigDecimal precio, String unidad, Integer stock) {
        SupplierProduct product = new SupplierProduct();
        product.supplier = supplier;
        product.nombre = nombre;
        product.precio = precio;
        product.unidad = unidad;
        product.stock = stock;
        return product;
    }
} 