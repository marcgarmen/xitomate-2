package com.xitomate.infrastructure.rest;

import com.xitomate.application.service.SupplierService;
import com.xitomate.domain.dto.SupplierViewDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import java.util.List;

@Path("/suppliers")
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Suppliers", description = "Supplier management endpoints")
public class SupplierResource {

    @Inject
    SupplierService service;

    @GET
    @Operation(
        summary = "List all suppliers",
        description = "Returns a paginated list of suppliers with optional filtering and sorting"
    )
    @APIResponse(
        responseCode = "200",
        description = "List of suppliers retrieved successfully"
    )
    public List<SupplierViewDTO> listSuppliers(
        @Parameter(description = "Search query for filtering suppliers") @QueryParam("query") String query,
        @Parameter(description = "Sort field (rating or name)") @QueryParam("sort") @DefaultValue("name") String sort,
        @Parameter(description = "Page number (0-based)") @QueryParam("page") @DefaultValue("0") int page,
        @Parameter(description = "Page size") @QueryParam("size") @DefaultValue("20") int size
    ) {
        return service.listSuppliers(query, sort, page, size);
    }
} 