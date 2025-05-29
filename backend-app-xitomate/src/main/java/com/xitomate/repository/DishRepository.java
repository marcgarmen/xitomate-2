package com.xitomate.repository;

import com.xitomate.domain.entity.Dish;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DishRepository implements PanacheRepository<Dish> {
} 