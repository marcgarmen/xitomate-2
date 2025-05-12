package com.itesm.ecommerce.application.service.cart;

import com.itesm.ecommerce.domain.model.Product;
import com.itesm.ecommerce.domain.model.ShoppingCart;
import com.itesm.ecommerce.domain.model.User;
import com.itesm.ecommerce.domain.repository.ProductRepository;
import com.itesm.ecommerce.domain.repository.ShoppingCartHasItemRepository;
import com.itesm.ecommerce.domain.repository.ShoppingCartRepository;
import com.itesm.ecommerce.domain.repository.UserRepository;
import com.itesm.ecommerce.infrastructure.persistence.repository.ShoppingCartHasItemRepositoryImpl;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class CartService {

    @Inject
    ShoppingCartRepository shoppingCartRepository;
    @Inject
    UserRepository userRepository;
    @Inject
    ProductRepository productRepository;
    @Inject
    ShoppingCartHasItemRepository shoppingCartHasItemRepository;
    @Transactional
    public void addProductToCartService(int productId, int quantity, String firebaseId){
        User user= userRepository.findByFirebaseId(firebaseId);
        ShoppingCart sc= shoppingCartRepository.findByUserId(user.getId());
        if(sc==null){
            shoppingCartRepository.createShoppingCart(user.getId());
            sc= shoppingCartRepository.findByUserId(user.getId());
        }
        shoppingCartHasItemRepository.addItemToCart(sc.getId(),productId,quantity);
    }

    public ShoppingCart getShoppingCart(String firebaseId) {
        User user = userRepository.findByFirebaseId(firebaseId);
        return shoppingCartRepository.findByUserId(user.getId());
    }
}
