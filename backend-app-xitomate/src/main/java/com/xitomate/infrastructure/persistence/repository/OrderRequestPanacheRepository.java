package com.xitomate.infrastructure.persistence.repository;

import com.xitomate.domain.entity.OrderRequest;
import com.xitomate.domain.enums.OrderStatus;
import com.xitomate.domain.enums.PaymentStatus;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class OrderRequestPanacheRepository implements PanacheRepository<OrderRequest> {

    public List<Object[]> countByStatus(Long supplierId){
        return find("select status, count(id) from OrderRequest where supplier.id = ?1 group by status", supplierId)
                .project(Object[].class).list();
    }

    public List<Object[]> dailyIncome(LocalDate from){
        return find("select fecha, sum(op.cantidad * op.precioUnitario) " +
                        "from OrderRequest orq join orq.orderProducts op " +
                        "where orq.status = ?1 and orq.paymentStatus = ?2 and orq.fecha >= ?3 " +
                        "group by fecha order by fecha",
                OrderStatus.ACCEPTED, PaymentStatus.CAPTURED, from)
                .project(Object[].class).list();
    }

    public List<Object[]> topProducts(LocalDate start, LocalDate end, int limit){
        return find("select sp.id, sp.nombre, sum(op.cantidad) " +
                        "from OrderRequest orq join orq.orderProducts op join op.supplierProduct sp " +
                        "where orq.status = ?1 and orq.fecha between ?2 and ?3 " +
                        "group by sp.id, sp.nombre order by sum(op.cantidad) desc",
                OrderStatus.ACCEPTED, start, end)
                .page(0, limit).project(Object[].class).list();
    }
}
