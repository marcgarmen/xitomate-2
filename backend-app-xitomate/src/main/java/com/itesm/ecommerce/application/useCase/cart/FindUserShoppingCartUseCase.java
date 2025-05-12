package com.itesm.ecommerce.application.useCase.cart;

import com.itesm.ecommerce.application.service.cart.CartService;
import com.itesm.ecommerce.domain.model.ShoppingCart;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class FindUserShoppingCartUseCase {

    @Inject
    CartService shoppingCartService;
    public ShoppingCart execute(String firebaseId) {
        return shoppingCartService.getShoppingCart(firebaseId);
    }
}
