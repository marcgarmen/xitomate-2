package com.xitomate.application.useCase;

import com.xitomate.application.service.ProductQueryService;
import com.xitomate.domain.entity.SupplierProduct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class GetActiveProductsUseCase {
    
    @Inject
    ProductQueryService service;

    public List<SupplierProduct> execute(Long supplierId, String sortBy, int page, int size) {
        return service.findActiveProducts(supplierId, sortBy, page, size);
    }

    public List<SupplierProduct> executeByCategory(Long supplierId, String category, String sortBy, int page, int size) {
        return service.findActiveProductsByCategory(supplierId, category, sortBy, page, size);
    }
} 