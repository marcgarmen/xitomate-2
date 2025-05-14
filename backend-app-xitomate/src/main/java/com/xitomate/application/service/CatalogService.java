package com.xitomate.domain.service;

import com.xitomate.infrastructure.persistence.repository.SupplierProductPanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class CatalogService {
    @Inject SupplierProductPanacheRepository repo;
    public List<?> getCatalog(Long supplierId, int page, int size){
        return repo.findAvailable(supplierId, page, size);
    }
}