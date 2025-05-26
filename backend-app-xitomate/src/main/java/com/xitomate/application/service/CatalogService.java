package com.xitomate.application.service;

import com.xitomate.domain.entity.SupplierProduct;
import com.xitomate.infrastructure.persistence.repository.SupplierProductPanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class CatalogService {
    
    @Inject
    SupplierProductPanacheRepository repo;

    public List<SupplierProduct> getCatalog(Long supplierId, int page, int size) {
        return repo.find("supplier.id = ?1 and activo = true order by fechaActualizacion desc", supplierId)
                .page(page, size)
                .list();
    }
}