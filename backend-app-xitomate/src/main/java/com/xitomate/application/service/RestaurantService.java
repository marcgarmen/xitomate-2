package com.xitomate.application.service;

import com.xitomate.domain.entity.Dish;
import com.xitomate.domain.entity.User;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.SecurityContext;
import java.util.List;

@ApplicationScoped
public class RestaurantService {

    @Inject
    EntityManager entityManager;

    @Transactional
    public Dish createDish(Dish dish, SecurityContext securityContext) {

        String email = securityContext.getUserPrincipal().getName();

        User restaurant = entityManager.createQuery(
            "SELECT u FROM User u WHERE u.email = :email", User.class)
            .setParameter("email", email)
            .getResultList()
            .stream()
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        dish.restaurant = restaurant;
        entityManager.persist(dish);
        return dish;
    }

    public List<Dish> getDishes(SecurityContext securityContext) {
        String email = securityContext.getUserPrincipal().getName();
        
        User restaurant = entityManager.createQuery(
            "SELECT u FROM User u WHERE u.email = :email", User.class)
            .setParameter("email", email)
            .getResultList()
            .stream()
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        return entityManager.createQuery(
            "SELECT d FROM Dish d WHERE d.restaurant = :restaurant", Dish.class)
            .setParameter("restaurant", restaurant)
            .getResultList();
    }
} 