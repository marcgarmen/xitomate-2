package com.xitomate.application.useCase;

import com.xitomate.application.service.OrderManagementService;
import com.xitomate.domain.entity.OrderRequest;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class ManageSupplierOrdersUseCase {
    
    @Inject
    OrderManagementService service;

    public List<OrderRequest> getPendingOrders(Long supplierId) {
        return service.findPendingOrders(supplierId);
    }

    public OrderRequest acceptOrder(Long orderId, Long supplierId) {
        return service.acceptOrder(orderId, supplierId);
    }

    public OrderRequest declineOrder(Long orderId, Long supplierId) {
        return service.declineOrder(orderId, supplierId);
    }
} 