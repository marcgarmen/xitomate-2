package com.xitomate.repository;

import com.xitomate.domain.entity.SupplierProduct;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
 
@ApplicationScoped
public class SupplierProductRepository implements PanacheRepository<SupplierProduct> {
} 