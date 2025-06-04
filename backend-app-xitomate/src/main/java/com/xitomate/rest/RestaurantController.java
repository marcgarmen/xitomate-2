package com.xitomate.rest;

import com.xitomate.domain.dto.*;
import com.xitomate.domain.entity.*;
import com.xitomate.service.RestaurantService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Path("/restaurant")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RestaurantController {

    @Inject
    RestaurantService restaurantService;

    @Context
    SecurityContext securityContext;

    @POST
    @Path("/register")
    public UserDTO register(UserDTO userDTO) {
        return restaurantService.register(userDTO);
    }

    @POST
    @Path("/login")
    public String login(UserDTO userDTO) {
        return restaurantService.login(userDTO);
    }

    @POST
    @Path("/dishes")
    @RolesAllowed("RESTAURANT")
    public Response createDish(DishDTO dishDTO) {
        try {
            String token = securityContext.getUserPrincipal().getName();
            DishDTO createdDish = restaurantService.createDish(dishDTO, token);
            return Response.ok(createdDish).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }
    }

    @GET
    @Path("/dishes")
    @RolesAllowed("RESTAURANT")
    public List<DishDTO> getDishes() {
        String token = securityContext.getUserPrincipal().getName();
        return restaurantService.getDishes(token);
    }

    @POST
    @Path("/sales")
    @RolesAllowed("RESTAURANT")
    public SaleDTO createSale(SaleDTO saleDTO) {
        return restaurantService.createSale(saleDTO, securityContext.getUserPrincipal().getName());
    }

    @GET
    @Path("/suppliers")
    @RolesAllowed("RESTAURANT")
    public List<SupplierDTO> getSuppliers() {
        return restaurantService.getSuppliers();
    }

    @POST
    @Path("/stock")
    @RolesAllowed("RESTAURANT")
    public void addStock(StockDTO stockDTO) {
        restaurantService.addStock(stockDTO, securityContext.getUserPrincipal().getName());
    }

    @GET
    @Path("/ingredients/most-used")
    @RolesAllowed("RESTAURANT")
    public List<IngredientUsageDTO> getMostUsedIngredients(@QueryParam("date") LocalDate date) {
        return restaurantService.getMostUsedIngredients(date, securityContext.getUserPrincipal().getName());
    }

    @GET
    @Path("/dishes/top")
    @RolesAllowed("RESTAURANT")
    public List<DishSalesDTO> getTopDishes(@QueryParam("date") LocalDate date) {
        return restaurantService.getTopDishes(date, securityContext.getUserPrincipal().getName());
    }

    @GET
    @Path("/sales/daily")
    @RolesAllowed("RESTAURANT")
    public List<SaleDTO> getDailySales(@QueryParam("date") LocalDate date) {
        return restaurantService.getDailySales(date, securityContext.getUserPrincipal().getName());
    }

    @GET
    @Path("/ingredients/low-stock")
    @RolesAllowed("RESTAURANT")
    public List<SupplierProductDTO> getLowStockIngredients() {
        return restaurantService.getLowStockIngredients(securityContext.getUserPrincipal().getName());
    }

    @PUT
    @Path("/dishes/{id}")
    @RolesAllowed("RESTAURANT")
    public Response updateDish(@PathParam("id") Long id, DishDTO dishDTO) {
        try {
            String token = securityContext.getUserPrincipal().getName();
            DishDTO updatedDish = restaurantService.updateDish(id, dishDTO, token);
            return Response.ok(updatedDish).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }
    }

    @DELETE
    @Path("/dishes/{id}")
    @RolesAllowed("RESTAURANT")
    public Response deleteDish(@PathParam("id") Long id) {
        try {
            String token = securityContext.getUserPrincipal().getName();
            restaurantService.deleteDish(id, token);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }
    }
} 