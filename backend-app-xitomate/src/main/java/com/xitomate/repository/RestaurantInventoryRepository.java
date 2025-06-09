package com.xitomate.repository;

import com.xitomate.domain.entity.RestaurantInventory;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
 
@ApplicationScoped
public class RestaurantInventoryRepository implements PanacheRepository<RestaurantInventory> {
} 