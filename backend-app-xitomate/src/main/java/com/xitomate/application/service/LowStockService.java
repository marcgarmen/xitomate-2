package com.xitomate.application.service;

import com.xitomate.infrastructure.persistence.repository.SupplierProductPanacheRepository;
import com.xitomate.domain.entity.SupplierProduct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class LowStockService {

    @Inject SupplierProductPanacheRepository repo;

    public List<SupplierProduct> lowStock(Long supplierId, int threshold) {
        return repo.find(
                "supplier.id = ?1 and stock <= ?2 order by stock asc",
                 supplierId, threshold).list();
    }
}
