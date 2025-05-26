package com.xitomate.infrastructure.rest;

import com.xitomate.application.useCase.ManageSupplierOrdersUseCase;
import com.xitomate.domain.entity.OrderRequest;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

@Path("/supplier/orders")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SupplierOrderResource {
    
    @Inject
    ManageSupplierOrdersUseCase useCase;

    @GET
    public Response getPendingOrders(@QueryParam("supplierId") Long supplierId) {
        try {
            List<OrderRequest> orders = useCase.getPendingOrders(supplierId);
            return Response.ok(orders).build();
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
            return Response.ok(order).build();
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
            return Response.ok(order).build();
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
} 