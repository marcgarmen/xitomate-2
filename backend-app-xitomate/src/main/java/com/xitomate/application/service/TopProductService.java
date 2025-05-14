package com.xitomate.application.service;

import com.xitomate.infrastructure.persistence.repository.OrderRequestPanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class TopProductService {

    @Inject OrderRequestPanacheRepository repo;

    public List<Object[]> topProducts(LocalDate start, LocalDate end, int limit) {
        return repo.find("""
           select sp.id, sp.nombre, sum(op.cantidad)
           from OrderRequest orq
           join orq.orderProducts op
           join op.supplierProduct sp
           where orq.status = com.xitomate.domain.enums.OrderStatus.ACCEPTED
             and orq.fecha between ?1 and ?2
           group by sp.id, sp.nombre
           order by sum(op.cantidad) desc
           """, start, end)
           .page(0, limit)
           .project(Object[].class)
           .list();
    }
}
