package com.xitomate.application.useCase;

import com.xitomate.application.service.LowStockService;
import com.xitomate.domain.entity.SupplierProduct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class GetLowStockAlertUseCase {

    @Inject
    LowStockService service;

    public List<SupplierProduct> execute(Long supplierId, int threshold) {
        return service.lowStock(supplierId, threshold);
    }
}
