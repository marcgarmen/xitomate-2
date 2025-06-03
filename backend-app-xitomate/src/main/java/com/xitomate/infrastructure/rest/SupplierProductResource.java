package com.xitomate.infrastructure.rest;

import com.xitomate.domain.dto.SupplierProductDTO;
import com.xitomate.domain.entity.SupplierProduct;
import com.xitomate.domain.entity.User;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.Map;

@Path("/supplier/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SupplierProductResource {

    @Inject
    EntityManager entityManager;

    @POST
    @Transactional
    public Response createProduct(SupplierProductDTO productDTO) {
        try {
            // Obtener el ID del supplier del token
            Long supplierId = entityManager.createQuery(
                "SELECT u.id FROM User u WHERE u.email = :email", Long.class)
                .setParameter("email", "supplier@test.com")
                .getSingleResult();

            User supplier = entityManager.find(User.class, supplierId);
            if (supplier == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity(Map.of("error", "Supplier not found"))
                        .build();
            }

            SupplierProduct product = new SupplierProduct();
            product.supplier = supplier;
            product.nombre = productDTO.getNombre();
            product.precio = productDTO.getPrecio();
            product.unidad = productDTO.getUnidad();
            product.stock = productDTO.getStock();

            entityManager.persist(product);
            return Response.status(Response.Status.CREATED).entity(product).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }
    }
} 