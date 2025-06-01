package com.xitomate.repository;

import com.xitomate.domain.entity.Sale;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SaleRepository implements PanacheRepository<Sale> {
} 