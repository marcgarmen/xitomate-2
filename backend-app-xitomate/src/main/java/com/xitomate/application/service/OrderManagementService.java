package com.xitomate.application.service;

import com.xitomate.domain.entity.OrderRequest;
import com.xitomate.domain.enums.OrderStatus;
import com.xitomate.infrastructure.persistence.repository.OrderRequestPanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class OrderManagementService {
    
    @Inject
    OrderRequestPanacheRepository repo;

    public List<OrderRequest> findPendingOrders(Long supplierId) {
        return repo.find("supplier.id = ?1 and status = ?2 order by fecha desc", 
                        supplierId, OrderStatus.PENDIENTE)
                  .list();
    }

    @Transactional
    public OrderRequest acceptOrder(Long orderId, Long supplierId) {
        OrderRequest order = repo.find("id = ?1 and supplier.id = ?2 and status = ?3", 
                                     orderId, supplierId, OrderStatus.PENDIENTE)
                               .firstResult();
        
        if (order == null) {
            throw new IllegalArgumentException("Order not found or not in pending status");
        }
        
        order.status = OrderStatus.ACEPTADO;
        return order;
    }

    @Transactional
    public OrderRequest declineOrder(Long orderId, Long supplierId) {
        OrderRequest order = repo.find("id = ?1 and supplier.id = ?2 and status = ?3", 
                                     orderId, supplierId, OrderStatus.PENDIENTE)
                               .firstResult();
        
        if (order == null) {
            throw new IllegalArgumentException("Order not found or not in pending status");
        }
        
        order.status = OrderStatus.RECHAZADO;
        return order;
    }
} 