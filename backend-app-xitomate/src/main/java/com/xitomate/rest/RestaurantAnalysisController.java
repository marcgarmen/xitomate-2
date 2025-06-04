package com.xitomate.rest;

import com.xitomate.client.PythonForecastClient;
import com.xitomate.domain.dto.*;
import com.xitomate.service.RestaurantService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import java.time.LocalDate;
import java.util.*;

@Path("/restaurant/analysis")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RestaurantAnalysisController {

    @Inject
    RestaurantService restaurantService;

    @Inject
    PythonForecastClient forecastClient;

    @Context
    SecurityContext securityContext;

    @GET
    @Path("/top-dishes")
    @RolesAllowed("RESTAURANT")
    public List<DishSalesDTO> getTopDishes() {
        String userId = securityContext.getUserPrincipal().getName();
        return restaurantService.getTopDishesForAnalysis(userId);
    }

    @GET
    @Path("/ingredient-usage")
    @RolesAllowed("RESTAURANT")
    public Map<String, List<IngredientUsageDTO>> getIngredientUsage() {
        String userId = securityContext.getUserPrincipal().getName();
        return restaurantService.getIngredientUsageForAnalysis(userId);
    }

    @GET
    @Path("/daily-income")
    @RolesAllowed("RESTAURANT")
    public Map<String, Object> getDailyIncome() {
        String userId = securityContext.getUserPrincipal().getName();
        return restaurantService.getDailyIncomeForAnalysis(userId);
    }

    @GET
    @Path("/low-stock")
    @RolesAllowed("RESTAURANT")
    public List<SupplierProductDTO> getLowStock() {
        String userId = securityContext.getUserPrincipal().getName();
        return restaurantService.getLowStockIngredients(userId);
    }

    @GET
    @Path("/top-supplier")
    @RolesAllowed("RESTAURANT")
    public Map<String, String> getTopSupplier() {
        String userId = securityContext.getUserPrincipal().getName();
        return restaurantService.getTopSupplierForAnalysis(userId);
    }

    @GET
    @Path("/inventory-forecast")
    @RolesAllowed("RESTAURANT")
    public Response getInventoryForecast() {
        String userId = securityContext.getUserPrincipal().getName();
        List<?> history = restaurantService.getIngredientUsageHistoryForForecast(userId);
        String forecast = forecastClient.getForecast(history);
        List<?> inventory = restaurantService.getCurrentInventory(userId);
        Map<String, Object> result = new HashMap<>();
        result.put("inventory", inventory);
        result.put("forecast", forecast);
        return Response.ok(result).build();
    }
}