package com.xitomate.infrastructure.rest;

import com.xitomate.application.useCase.ManageSupplierOrdersUseCase;
import com.xitomate.domain.entity.OrderRequest;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/supplier/orders")
@Produces(MediaType.APPLICATION_JSON)
public class SupplierOrderResource {
    
    @Inject
    ManageSupplierOrdersUseCase useCase;

    @GET
    public List<OrderRequest> getPendingOrders(@QueryParam("supplierId") Long supplierId) {
        return useCase.getPendingOrders(supplierId);
    }

    @POST
    @Path("/{id}/accept")
    public OrderRequest acceptOrder(@PathParam("id") Long orderId, 
                                  @QueryParam("supplierId") Long supplierId) {
        return useCase.acceptOrder(orderId, supplierId);
    }

    @POST
    @Path("/{id}/decline")
    public OrderRequest declineOrder(@PathParam("id") Long orderId, 
                                   @QueryParam("supplierId") Long supplierId) {
        return useCase.declineOrder(orderId, supplierId);
    }
} 