package com.xitomate.infrastructure.rest;

import com.xitomate.application.useCase.ManageSupplierOrdersUseCase;
import com.xitomate.domain.entity.OrderRequest;
import com.xitomate.domain.enums.OrderStatus;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.annotation.security.RolesAllowed;

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
    @RolesAllowed("SUPPLIER")
    public Response getAllOrders(@QueryParam("supplierId") Long supplierId) {
        return Response.ok(useCase.getAllOrders(supplierId)).build();
    }

    @GET
    public Response getPendingOrders(@QueryParam("supplierId") Long supplierId) {
        return Response.ok(useCase.getPendingOrders(supplierId)).build();
    }

    @POST
    @Path("/{id}/accept")
    public Response acceptOrder(@PathParam("id") Long orderId, @QueryParam("supplierId") Long supplierId) {
        return Response.ok(useCase.acceptOrder(orderId, supplierId)).build();
    }

    @POST
    @Path("/{id}/decline")
    public Response declineOrder(@PathParam("id") Long orderId, @QueryParam("supplierId") Long supplierId) {
        return Response.ok(useCase.declineOrder(orderId, supplierId)).build();
    }

    @PATCH
    @Path("/{id}/status")
    @Transactional
    public Response updateOrderStatus(@PathParam("id") Long orderId, @QueryParam("status") String status) {
        OrderRequest order = entityManager.find(OrderRequest.class, orderId);
        if (order == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        order.status = OrderStatus.valueOf(status);
        entityManager.merge(order);
        return Response.noContent().build();
    }
}