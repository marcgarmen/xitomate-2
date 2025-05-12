package com.itesm.ecommerce.infrastructure.rest;

import com.itesm.ecommerce.application.useCase.cart.AddProductToCartUseCase;
import com.itesm.ecommerce.application.useCase.cart.FindUserShoppingCartUseCase;
import com.itesm.ecommerce.infrastructure.dto.cart.AddProductToCartDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.annotations.Message;

import java.util.HashMap;
import java.util.Map;

@Path("/cart")
public class ShoppingCartController {
    @Inject
    AddProductToCartUseCase addProductToCartUseCase;
    @Inject
    FindUserShoppingCartUseCase findUserShoppingCartUseCase;

    @POST
    @Path("/add")
    public Response addProductToCart(AddProductToCartDTO addProductToCartDTO) {
        // Call the use case to add the product to the cart
        addProductToCartUseCase.execute(addProductToCartDTO, "vlb5W7GDJEfvy2n4cL7YyuztQSu2");
        Map<String,String> response= new HashMap<>();
        response.put("message", "Product added to cart successfully");
        return Response.ok().entity(response).build();
    }

    @GET
    public Response getShoppingCart() {
        // Call the use case to get the shopping cart
        return Response.ok().entity(findUserShoppingCartUseCase.execute("vlb5W7GDJEfvy2n4cL7YyuztQSu2")).build();
    }
}
