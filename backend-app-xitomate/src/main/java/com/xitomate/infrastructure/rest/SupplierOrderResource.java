package com.xitomate.infrastructure.rest;

import com.xitomate.application.useCase.ManageSupplierOrdersUseCase;
import com.xitomate.domain.entity.OrderRequest;
import com.xitomate.domain.dto.OrderRequestViewDTO;
import com.xitomate.domain.enums.OrderStatus;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Path("/supplier/orders")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SupplierOrderResource {
    
    @Inject
    ManageSupplierOrdersUseCase useCase;

    @Inject
    EntityManager entityManager;

    @GET
    @Path("/all")
    public Response getAllOrders(@QueryParam("supplierId") Long supplierId) {
        try {
            List<OrderRequest> orders = useCase.getAllOrders(supplierId);
            List<OrderRequestViewDTO> dtos = orders.stream().map(order -> new OrderRequestViewDTO(
                order.id,
                order.restaurant != null ? order.restaurant.nombre : null,
                order.restaurant != null ? order.restaurant.email : null,
                order.supplier != null ? order.supplier.nombre : null,
                order.supplier != null ? order.supplier.email : null,
                order.status != null ? order.status.name() : null,
                order.fecha,
                order.total,
                order.paymentMethod != null ? order.paymentMethod.name() : null
            )).collect(Collectors.toList());
            return Response.ok(dtos).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }
    }

    @GET
    public Response getPendingOrders(@QueryParam("supplierId") Long supplierId) {
        try {
            List<OrderRequest> orders = useCase.getPendingOrders(supplierId);
            List<OrderRequestViewDTO> dtos = orders.stream().map(order -> new OrderRequestViewDTO(
                order.id,
                order.restaurant != null ? order.restaurant.nombre : null,
                order.restaurant != null ? order.restaurant.email : null,
                order.supplier != null ? order.supplier.nombre : null,
                order.supplier != null ? order.supplier.email : null,
                order.status != null ? order.status.name() : null,
                order.fecha,
                order.total,
                order.paymentMethod != null ? order.paymentMethod.name() : null
            )).collect(Collectors.toList());
            return Response.ok(dtos).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }
    }

    @POST
    @Path("/{id}/accept")
    public Response acceptOrder(@PathParam("id") Long orderId, 
                              @QueryParam("supplierId") Long supplierId) {
        try {
            OrderRequest order = useCase.acceptOrder(orderId, supplierId);
            OrderRequestViewDTO dto = new OrderRequestViewDTO(
                order.id,
                order.restaurant != null ? order.restaurant.nombre : null,
                order.restaurant != null ? order.restaurant.email : null,
                order.supplier != null ? order.supplier.nombre : null,
                order.supplier != null ? order.supplier.email : null,
                order.status != null ? order.status.name() : null,
                order.fecha,
                order.total,
                order.paymentMethod != null ? order.paymentMethod.name() : null
            );
            return Response.ok(dto).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }
    }

    @POST
    @Path("/{id}/decline")
    public Response declineOrder(@PathParam("id") Long orderId, 
                               @QueryParam("supplierId") Long supplierId) {
        try {
            OrderRequest order = useCase.declineOrder(orderId, supplierId);
            OrderRequestViewDTO dto = new OrderRequestViewDTO(
                order.id,
                order.restaurant != null ? order.restaurant.nombre : null,
                order.restaurant != null ? order.restaurant.email : null,
                order.supplier != null ? order.supplier.nombre : null,
                order.supplier != null ? order.supplier.email : null,
                order.status != null ? order.status.name() : null,
                order.fecha,
                order.total,
                order.paymentMethod != null ? order.paymentMethod.name() : null
            );
            return Response.ok(dto).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }
    }

    // Endpoint PATCH para cambiar el estado de una orden manualmente (solo para pruebas)
    @PATCH
    @Path("/{id}/status")
    @Transactional
    public Response updateOrderStatus(@PathParam("id") Long orderId, @QueryParam("status") String status) {
        try {
            OrderRequest order = entityManager.find(OrderRequest.class, orderId);
            if (order == null) {
                return Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", "Order not found")).build();
            }
            order.status = OrderStatus.valueOf(status);
            entityManager.merge(order);
            return Response.ok(Map.of("message", "Order status updated", "orderId", orderId, "newStatus", status)).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", e.getMessage())).build();
        }
    }
} 