package com.itesm.ecommerce.infrastructure.rest;

import com.itesm.ecommerce.application.useCase.category.CreateCategoryUseCase;
import com.itesm.ecommerce.application.useCase.category.ListCategoryUseCase;
import com.itesm.ecommerce.infrastructure.dto.category.CreateCategoryDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.checkerframework.checker.units.qual.C;

@Path("/categories")
public class CategoryController {
    @Inject
    CreateCategoryUseCase createCategoryUseCase;
    @Inject
    ListCategoryUseCase listCategoriesUseCase;

    @POST
    public Response createCategory(CreateCategoryDTO createCategoryDTO) {
        // Logic to create a category
        return Response.ok().entity(createCategoryUseCase.execute(createCategoryDTO)).build();
    }

    @GET
    @Path("/list")
    public Response listCategories() {
        // Logic to list categories
        return Response.ok(listCategoriesUseCase.execute()).build();
    }
}
