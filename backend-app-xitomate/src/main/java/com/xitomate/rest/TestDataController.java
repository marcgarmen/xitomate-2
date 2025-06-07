package com.xitomate.rest;

import com.xitomate.domain.entity.User;
import com.xitomate.domain.entity.SupplierProduct;
import com.xitomate.domain.enums.UserRole;
import com.xitomate.service.PasswordService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Path("/test-data")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TestDataController {

    @Inject
    EntityManager entityManager;

    @Inject
    PasswordService passwordService;

    @POST
    @Path("/upload")
    @RolesAllowed("ADMIN")
    @Transactional
    public Response uploadTestData() {
        try {
            // Create a test supplier
            User newSupplier = new User();
            newSupplier.email = "supplier@test.com";
            newSupplier.passwordSalt = passwordService.generateSalt();
            newSupplier.passwordHash = passwordService.hashPassword("password123", newSupplier.passwordSalt);
            newSupplier.role = UserRole.SUPPLIER;
            newSupplier.nombre = "Test Supplier";
            newSupplier.ubicacion = "Test Location";
            
            entityManager.persist(newSupplier);

            // Create some test products
            createProduct(newSupplier, "Jitomate 1 kg", new BigDecimal("25.00"), "kg", 100);
            createProduct(newSupplier, "Cebolla 1 kg", new BigDecimal("20.00"), "kg", 100);
            createProduct(newSupplier, "Pollo 1 kg", new BigDecimal("80.00"), "kg", 50);
            createProduct(newSupplier, "Arroz 1 kg", new BigDecimal("30.00"), "kg", 200);
            createProduct(newSupplier, "Aceite 1 lt", new BigDecimal("45.00"), "lt", 100);

            return Response.ok(Map.of("message", "Test data created successfully")).build();
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
        entityManager.persist(product);
        return product;
    }
} 