package com.itesm.ecommerce.infrastructure.persistence.repository;

import com.itesm.ecommerce.domain.model.ShoppingCart;
import com.itesm.ecommerce.domain.repository.ShoppingCartHasItemRepository;
import com.itesm.ecommerce.domain.repository.ShoppingCartRepository;
import com.itesm.ecommerce.infrastructure.persistence.entity.ShoppingCartEntity;
import com.itesm.ecommerce.infrastructure.persistence.entity.ShoppingCartHasProductsEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ShoppingCartHasItemRepositoryImpl implements ShoppingCartHasItemRepository, PanacheRepository<ShoppingCartHasProductsEntity> {

    @Inject
    UserRepositoryImpl userRepository;
    @Inject
    ProductRepositoryImpl productRepository;
    @Inject
    ShoppingCartRepositoryImpl shoppingCartRepository;


    @Override
    public void addItemToCart(int shoppingCartId, int productId, int quantity) {
        ShoppingCartHasProductsEntity shoppingCartHasProductsEntity = new ShoppingCartHasProductsEntity();
        ShoppingCartEntity shoppingCartEntity = shoppingCartRepository.findByIdEntity(shoppingCartId);
        shoppingCartHasProductsEntity.setProduct(productRepository.findById(productId));
        shoppingCartHasProductsEntity.setShoppingCart(shoppingCartEntity);
        shoppingCartHasProductsEntity.setQuantity(quantity);
        persist(shoppingCartHasProductsEntity);
    }

    @Override
    public void removeItemFromCart(int shoppingCartId, int productId) {
        //TODO
    }

    @Override
    public void updateItemQuantity(int shoppingCartId, int productId, int quantity) {
        //TODO
    }

    @Override
    public void clearCart(int shoppingCartId) {
        //TODO
    }
}
