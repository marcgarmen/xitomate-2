package com.xitomate.infrastructure.rest;

import com.xitomate.application.useCase.GetAvailableCatalogUseCase;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/suppliers/{id}/catalog")
@Produces(MediaType.APPLICATION_JSON)
public class SupplierCatalogResource {
    @Inject GetAvailableCatalogUseCase useCase;

    @GET
    public List<?> list(@PathParam("id") Long id,
                        @QueryParam("page") @DefaultValue("0") int page,
                        @QueryParam("size") @DefaultValue("20") int size) {
        return useCase.execute(id, page, size);
    }
}
