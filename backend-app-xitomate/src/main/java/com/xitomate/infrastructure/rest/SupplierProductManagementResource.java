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
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import jakarta.annotation.security.RolesAllowed;

@Path("/suppliers/{supplierId}/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SupplierProductManagementResource {

    @Inject
    EntityManager entityManager;

    @POST
    @Transactional
    public Response createProduct(@PathParam("supplierId") Long supplierId, SupplierProductDTO productDTO) {
        try {
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

    @PUT
    @Path("/{productId}")
    @Transactional
    public Response updateProduct(
            @PathParam("supplierId") Long supplierId,
            @PathParam("productId") Long productId,
            SupplierProductDTO productDTO) {
        try {
            SupplierProduct product = entityManager.find(SupplierProduct.class, productId);
            if (product == null || !product.supplier.id.equals(supplierId)) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity(Map.of("error", "Product not found or does not belong to supplier"))
                        .build();
            }

            product.nombre = productDTO.getNombre();
            product.precio = productDTO.getPrecio();
            product.unidad = productDTO.getUnidad();
            product.stock = productDTO.getStock();

            entityManager.merge(product);
            return Response.ok(product).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }
    }

    @DELETE
    @Path("/{productId}")
    @Transactional
    public Response deleteProduct(
            @PathParam("supplierId") Long supplierId,
            @PathParam("productId") Long productId) {
        try {
            SupplierProduct product = entityManager.find(SupplierProduct.class, productId);
            if (product == null || !product.supplier.id.equals(supplierId)) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity(Map.of("error", "Product not found or does not belong to supplier"))
                        .build();
            }

            entityManager.remove(product);
            return Response.ok(Map.of("message", "Product deleted successfully")).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }
    }

    @PATCH
    @Path("/{productId}/stock")
    @Transactional
    public Response updateStock(
            @PathParam("supplierId") Long supplierId,
            @PathParam("productId") Long productId,
            @QueryParam("newStock") Integer newStock) {
        try {
            if (newStock == null || newStock < 0) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(Map.of("error", "Invalid stock value"))
                        .build();
            }

            SupplierProduct product = entityManager.find(SupplierProduct.class, productId);
            if (product == null || !product.supplier.id.equals(supplierId)) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity(Map.of("error", "Product not found or does not belong to supplier"))
                        .build();
            }

            product.stock = newStock;
            entityManager.merge(product);
            return Response.ok(product).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"RESTAURANT", "ADMIN"})
    public List<SupplierProductDTO> getProducts(@PathParam("supplierId") Long supplierId) {
        List<SupplierProduct> products = entityManager.createQuery(
            "SELECT p FROM SupplierProduct p WHERE p.supplier.id = :supplierId", SupplierProduct.class)
            .setParameter("supplierId", supplierId)
            .getResultList();
        return products.stream().map(product -> {
            SupplierProductDTO dto = new SupplierProductDTO();
            dto.setId(product.id);
            dto.setNombre(product.nombre);
            dto.setPrecio(product.precio);
            dto.setUnidad(product.unidad);
            dto.setStock(product.stock);
            return dto;
        }).collect(Collectors.toList());
    }
} 