package com.xitomate.infrastructure.rest;

import com.xitomate.application.useCase.GetAvailableCatalogUseCase;
import com.xitomate.application.useCase.GetPipelineStatusUseCase;
import com.xitomate.application.useCase.GetDailyIncomeUseCase;
import com.xitomate.application.useCase.GetLowStockAlertUseCase;
import com.xitomate.application.useCase.GetTopProductsUseCase;
import com.xitomate.application.useCase.GetActiveProductsUseCase;
import com.xitomate.domain.dto.StatusCountDTO;
import com.xitomate.domain.entity.SupplierProduct;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.time.LocalDate;
import java.util.List;

@Path("/suppliers/{id}/catalog")
@Produces(MediaType.APPLICATION_JSON)
public class SupplierCatalogResource {
    @Inject GetAvailableCatalogUseCase useCase;
    @Inject GetPipelineStatusUseCase pipelineStatusUseCase;
    @Inject GetDailyIncomeUseCase dailyIncomeUseCase;
    @Inject GetLowStockAlertUseCase lowStockAlertUseCase;
    @Inject GetTopProductsUseCase topProductsUseCase;
    @Inject GetActiveProductsUseCase activeProductsUseCase;

    @GET
    public List<?> list(@PathParam("id") Long id,
                        @QueryParam("page") @DefaultValue("0") int page,
                        @QueryParam("size") @DefaultValue("20") int size) {
        return useCase.execute(id, page, size);
    }

    @GET
    @Path("/suppliers/{id}/pipeline-status")
    public List<StatusCountDTO> getPipelineStatus(@PathParam("id") Long supplierId) {
        return pipelineStatusUseCase.getPipeline(supplierId);
    }

    @GET
    @Path("/suppliers/{id}/daily-income")
    public List<Object[]> getDailyIncome(@PathParam("id") Long supplierId,
                                         @QueryParam("days") @DefaultValue("7") int lastNDays) {
        return dailyIncomeUseCase.execute(lastNDays);
    }

    @GET
    @Path("/suppliers/{id}/low-stock")
    public List<SupplierProduct> getLowStockAlert(@PathParam("id") Long supplierId,
                                                   @QueryParam("threshold") @DefaultValue("10") int threshold) {
        return lowStockAlertUseCase.execute(supplierId, threshold);
    }

    @GET
    @Path("/suppliers/{id}/top-products")
    public List<Object[]> getTopProducts(@PathParam("id") Long supplierId,
                                          @QueryParam("start") String startDate,
                                          @QueryParam("end") String endDate,
                                          @QueryParam("limit") @DefaultValue("5") int limit) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return topProductsUseCase.execute(start, end, limit);
    }

    @GET
    @Path("/active")
    public List<SupplierProduct> getActiveProducts(
            @PathParam("id") Long supplierId,
            @QueryParam("sortBy") @DefaultValue("date") String sortBy,
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("20") int size) {
        return activeProductsUseCase.execute(supplierId, sortBy, page, size);
    }

    @GET
    @Path("/active/category/{category}")
    public List<SupplierProduct> getActiveProductsByCategory(
            @PathParam("id") Long supplierId,
            @PathParam("category") String category,
            @QueryParam("sortBy") @DefaultValue("date") String sortBy,
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("20") int size) {
        return activeProductsUseCase.executeByCategory(supplierId, category, sortBy, page, size);
    }
}
