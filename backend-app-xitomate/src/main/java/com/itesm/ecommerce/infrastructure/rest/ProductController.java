package com.itesm.ecommerce.infrastructure.rest;

import com.itesm.ecommerce.application.useCase.products.AssignProductCategoryUseCase;
import com.itesm.ecommerce.application.useCase.products.CreateProductUseCase;
import com.itesm.ecommerce.application.useCase.products.ListProductsUseCase;
import com.itesm.ecommerce.infrastructure.dto.product.AssignCategoryDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import com.itesm.ecommerce.domain.model.Product;
import jakarta.ws.rs.core.Response;

import java.util.HashMap;
import java.util.Map;

@Path("products")
@Produces("application/json")
@Consumes("application/json")
public class ProductController {
    @Inject
    CreateProductUseCase createProductUseCase;
    @Inject
    AssignProductCategoryUseCase assignProductCategoryUseCase;
    @Inject
    ListProductsUseCase listProductsUseCase;
    @POST
    public Response createProduct(Product product) {
        product=createProductUseCase.execute(product);
        return Response.ok(product).build();
    }

    @GET
    @Path("/test-auth")
    public Response testAuth() {
        return Response.ok("Authentication successful").build();
    }

    @PATCH
    @Path("/assign-category")
    public Response assignCategory(AssignCategoryDTO assignCategoryDTO) {
        assignProductCategoryUseCase.execute(assignCategoryDTO);
        Map<String,String > response = new HashMap<>();
        response.put("message", "Category assigned to product successfully");
        return Response.ok(response).build();
    }

    @GET
    @Path("/list")
    public Response listProducts() {
        // Implement the logic to list products
        return Response.ok(listProductsUseCase.execute()).build();
    }

}
