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
import jakarta.transaction.Transactional;
import com.xitomate.domain.entity.RestaurantInventory;

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
        String forecastJson = forecastClient.getForecast(history);
        List<?> inventory = restaurantService.getCurrentInventory(userId);

        Object forecast;
        String errorMsg = null;
        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            if (forecastJson != null && forecastJson.trim().startsWith("[")) {
                forecast = mapper.readValue(forecastJson, List.class);
            } else {
                forecast = List.of();
                errorMsg = forecastJson;
            }
        } catch (Exception e) {
            forecast = List.of();
            errorMsg = "Error parsing forecast: " + e.getMessage();
        }

        Map<String, Object> result = new HashMap<>();
        result.put("inventory", inventory);
        result.put("forecast", forecast);
        if (errorMsg != null) {
            result.put("error", errorMsg);
        }
        return Response.ok(result).build();
    }

    @GET
    @Path("/inventory")
    @RolesAllowed("RESTAURANT")
    public List<Map<String, Object>> getInventory() {
        String userId = securityContext.getUserPrincipal().getName();
        return restaurantService.getCurrentInventory(userId);
    }

    @POST
    @Path("/inventory")
    @RolesAllowed("RESTAURANT")
    @Transactional
    public Response addOrUpdateInventory(InventoryDTO dto) {
        String userId = securityContext.getUserPrincipal().getName();
        restaurantService.addOrUpdateInventory(
            Long.parseLong(userId),
            dto.getSupplierProductId(),
            dto.getNombreLibre(),
            dto.getStock(),
            dto.getUnidad(),
            dto.getPrecio()
        );
        return Response.ok().build();
    }

    @PUT
    @Path("/inventory/{id}")
    @RolesAllowed("RESTAURANT")
    @Transactional
    public Response updateInventory(@PathParam("id") Long id, InventoryDTO dto) {
        String userId = securityContext.getUserPrincipal().getName();
        RestaurantInventory inventory = restaurantService.getInventoryById(id, Long.parseLong(userId));
        if (inventory == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", "Ingrediente no encontrado")).build();
        }
        if (dto.getStock() != null) inventory.stock = dto.getStock();
        if (dto.getUnidad() != null) inventory.unidad = dto.getUnidad();
        if (dto.getPrecio() != null) inventory.precio = dto.getPrecio();
        restaurantService.saveInventory(inventory);
        return Response.ok().build();
    }

    @DELETE
    @Path("/inventory/{id}")
    @RolesAllowed("RESTAURANT")
    @Transactional
    public Response deleteInventory(@PathParam("id") Long id) {
        String userId = securityContext.getUserPrincipal().getName();
        boolean deleted = restaurantService.deleteInventoryById(id, Long.parseLong(userId));
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", "Ingrediente no encontrado")).build();
        }
        return Response.ok().build();
    }

    @GET
    @Path("/sales-forecast")
    @RolesAllowed("RESTAURANT")
    public Response getSalesForecast() {
        String userId = securityContext.getUserPrincipal().getName();
        List<Map<String, Object>> salesHistory = restaurantService.getDailySalesHistoryForForecast(userId);
        String forecastJson = forecastClient.getForecast(salesHistory);

        Object forecast;
        String errorMsg = null;
        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            if (forecastJson != null && forecastJson.trim().startsWith("[")) {
                forecast = mapper.readValue(forecastJson, List.class);
            } else {
                forecast = List.of();
                errorMsg = forecastJson;
            }
        } catch (Exception e) {
            forecast = List.of();
            errorMsg = "Error parsing forecast: " + e.getMessage();
        }

        Map<String, Object> result = new java.util.HashMap<>();
        result.put("forecast", forecast);
        if (errorMsg != null) {
            result.put("error", errorMsg);
        }
        return Response.ok(result).build();
    }

    @GET
    @Path("/dish-sales-forecast")
    @RolesAllowed("RESTAURANT")
    public Response getDishSalesForecast() {
        String userId = securityContext.getUserPrincipal().getName();
        List<Map<String, Object>> dishSalesHistory = restaurantService.getDishSalesHistoryForForecast(userId);
        String forecastJson = forecastClient.getForecast(dishSalesHistory);

        Object forecast;
        String errorMsg = null;
        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            if (forecastJson != null && forecastJson.trim().startsWith("[")) {
                forecast = mapper.readValue(forecastJson, List.class);
            } else {
                forecast = List.of();
                errorMsg = forecastJson;
            }
        } catch (Exception e) {
            forecast = List.of();
            errorMsg = "Error parsing forecast: " + e.getMessage();
        }

        Map<String, Object> result = new java.util.HashMap<>();
        result.put("forecast", forecast);
        if (errorMsg != null) {
            result.put("error", errorMsg);
        }
        return Response.ok(result).build();
    }
}