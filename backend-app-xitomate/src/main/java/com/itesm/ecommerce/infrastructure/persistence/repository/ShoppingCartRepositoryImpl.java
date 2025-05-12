package com.itesm.ecommerce.infrastructure.persistence.repository;

import com.itesm.ecommerce.domain.model.ShoppingCart;
import com.itesm.ecommerce.domain.model.ShoppingCartItem;
import com.itesm.ecommerce.domain.repository.ShoppingCartRepository;
import com.itesm.ecommerce.infrastructure.persistence.entity.ShoppingCartEntity;
import com.itesm.ecommerce.infrastructure.persistence.entity.ShoppingCartHasProductsEntity;
import com.itesm.ecommerce.infrastructure.persistence.entity.UserEntity;
import com.itesm.ecommerce.infrastructure.persistence.mapper.ProductMapper;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.ArrayList;

@ApplicationScoped
public class ShoppingCartRepositoryImpl implements ShoppingCartRepository, PanacheRepositoryBase<ShoppingCartEntity,Integer> {

    @Inject
    UserRepositoryImpl userRepository;


    @Override
    public ShoppingCart findByUserId(int userId) {
        ShoppingCartEntity shoppingCartEntity = find("user.id", userId).firstResult();
        if (shoppingCartEntity != null) {
            ShoppingCart shoppingCart = new ShoppingCart();
            shoppingCart.setId(shoppingCartEntity.getId());
            shoppingCart.setStatus(shoppingCartEntity.getStatus());
            shoppingCart.setItems(new ArrayList<>());
            for(ShoppingCartHasProductsEntity item : shoppingCartEntity.getItems()) {
                ShoppingCartItem shoppingCartItem = new ShoppingCartItem();
                shoppingCartItem.setProduct(ProductMapper.toDomain(item.getProduct()));
                shoppingCartItem.setQuantity(item.getQuantity());
                shoppingCart.getItems().add(shoppingCartItem);
            }
            return shoppingCart;
        }
        return null;
    }

    @Override
    public void createShoppingCart(int userId) {
        ShoppingCartEntity shoppingCartEntity = new ShoppingCartEntity();
        UserEntity user=userRepository.findById(userId);
        shoppingCartEntity.setUser(user);
        persist(shoppingCartEntity);
    }

    public ShoppingCartEntity findByIdEntity(int id){
        return findById(id);
    }
}
