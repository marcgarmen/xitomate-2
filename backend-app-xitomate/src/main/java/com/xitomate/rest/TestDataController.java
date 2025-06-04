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
            // Crear un restaurante de prueba
            User restaurant = new User();
            restaurant.email = "restaurant@test.com";
            restaurant.password = "password123";
            restaurant.role = UserRole.RESTAURANT;
            restaurant.nombre = "Restaurante de Prueba";
            restaurant.ubicacion = "Ciudad de México";
            entityManager.persist(restaurant);

            // Crear un proveedor de prueba
            User supplier = new User();
            supplier.email = "supplier@test.com";
            supplier.password = "password123";
            supplier.role = UserRole.SUPPLIER;
            supplier.nombre = "Proveedor de Prueba";
            supplier.ubicacion = "Ciudad de México";
            entityManager.persist(supplier);

            // Crear productos del proveedor
            List<SupplierProduct> products = new ArrayList<>();
            String[] productNames = {"Tomate", "Cebolla", "Pollo", "Queso", "Tortillas"};
            String[] units = {"kg", "kg", "kg", "kg", "piece"};
            int[] stocks = {10, 15, 20, 5, 100};

            for (int i = 0; i < productNames.length; i++) {
                SupplierProduct product = new SupplierProduct();
                product.supplier = supplier;
                product.nombre = productNames[i];
                product.precio = new BigDecimal("50.00");
                product.unidad = units[i];
                product.stock = stocks[i];
                entityManager.persist(product);
                products.add(product);
            }

            // Crear platos
            List<Dish> dishes = new ArrayList<>();
            String[] dishNames = {"Tacos", "Quesadillas", "Enchiladas"};
            BigDecimal[] prices = {
                new BigDecimal("50.00"),
                new BigDecimal("60.00"),
                new BigDecimal("70.00")
            };

            for (int i = 0; i < dishNames.length; i++) {
                Dish dish = new Dish();
                dish.restaurant = restaurant;
                dish.nombre = dishNames[i];
                dish.precio = prices[i];
                dish.categoria = "Platos Principales";
                dish.ingredientes = new ArrayList<>();

                // Agregar ingredientes al plato
                for (int j = 0; j < 3; j++) {
                    DishIngredient ingredient = new DishIngredient();
                    ingredient.dish = dish;
                    ingredient.supplierProduct = products.get(j);
                    ingredient.cantidad = new BigDecimal("0.5");
                    ingredient.unidad = products.get(j).unidad;
                    dish.ingredientes.add(ingredient);
                }

                entityManager.persist(dish);
                dishes.add(dish);
            }

            // Crear ventas
            for (int i = 0; i < 5; i++) {
                Sale sale = new Sale();
                sale.restaurant = restaurant;
                sale.fecha = LocalDateTime.now().minusDays(i);
                sale.metodoPago = PaymentMethod.CARD.name();
                sale.items = new ArrayList<>();

                // Agregar items a la venta
                for (Dish dish : dishes) {
                    SaleItem item = new SaleItem();
                    item.sale = sale;
                    item.dish = dish;
                    item.cantidad = 2;
                    item.precioUnitario = dish.precio;
                    item.subtotal = dish.precio.multiply(new BigDecimal("2"));
                    sale.items.add(item);
                }

                sale.total = sale.items.stream()
                    .map(item -> item.subtotal)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

                entityManager.persist(sale);
            }

            return Response.ok(Map.of("message", "Test data uploaded successfully")).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }
    }
} 