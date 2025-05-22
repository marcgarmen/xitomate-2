package com.xitomate.application.service;

import com.xitomate.domain.entity.SupplierProduct;
import com.xitomate.infrastructure.persistence.repository.SupplierProductPanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class ProductQueryService {
    
    @Inject
    SupplierProductPanacheRepository repo;

    public List<SupplierProduct> findActiveProducts(Long supplierId, String sortBy, int page, int size) {
        String query = "supplier.id = ?1 and activo = true";
        
        if ("price".equalsIgnoreCase(sortBy)) {
            query += " order by precio asc";
        } else if ("rating".equalsIgnoreCase(sortBy)) {
            query += " order by rating desc";
        } else {
            query += " order by fechaActualizacion desc";
        }
        
        return repo.find(query, supplierId)
                .page(page, size)
                .list();
    }

    public List<SupplierProduct> findActiveProductsByCategory(Long supplierId, String category, String sortBy, int page, int size) {
        String query = "supplier.id = ?1 and activo = true and categoria = ?2";
        
        if ("price".equalsIgnoreCase(sortBy)) {
            query += " order by precio asc";
        } else if ("rating".equalsIgnoreCase(sortBy)) {
            query += " order by rating desc";
        } else {
            query += " order by fechaActualizacion desc";
        }
        
        return repo.find(query, supplierId, category)
                .page(page, size)
                .list();
    }
} 