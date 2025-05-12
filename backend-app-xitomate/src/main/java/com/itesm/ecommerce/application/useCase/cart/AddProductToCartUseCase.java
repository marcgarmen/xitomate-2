package com.itesm.ecommerce.application.useCase.cart;

import com.itesm.ecommerce.application.service.cart.CartService;
import com.itesm.ecommerce.infrastructure.dto.cart.AddProductToCartDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class AddProductToCartUseCase {
    @Inject
    CartService cartService;

    public void execute(AddProductToCartDTO addProductToCartDTO, String firebaseId) {
        cartService.addProductToCartService(addProductToCartDTO.getProductId(), addProductToCartDTO.getQuantity(), firebaseId);
    }
}
