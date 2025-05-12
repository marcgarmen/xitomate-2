package com.itesm.ecommerce.domain.repository;

public interface ShoppingCartHasItemRepository {
    void addItemToCart(int shoppingCartId, int productId, int quantity);
    void removeItemFromCart(int shoppingCartId, int productId);
    void updateItemQuantity(int shoppingCartId, int productId, int quantity);
    void clearCart(int shoppingCartId);
}
