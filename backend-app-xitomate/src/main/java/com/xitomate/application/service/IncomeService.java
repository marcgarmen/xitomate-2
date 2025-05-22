package com.xitomate.application.service;

import com.xitomate.domain.enums.OrderStatus;
import com.xitomate.domain.enums.PaymentStatus;
import com.xitomate.infrastructure.persistence.repository.OrderRequestPanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class IncomeService {

    @Inject OrderRequestPanacheRepository repo;

    public List<Object[]> dailyIncome(LocalDate start) {
        return repo.find("""
           select fecha,
                  sum(op.cantidad * op.precioUnitario)
           from OrderRequest orq
           join orq.orderProducts op
           where orq.status        = ?1
             and orq.paymentStatus = ?2
             and orq.fecha >= ?3
           group by fecha
           order by fecha
           """,
           OrderStatus.ACCEPTED,
           PaymentStatus.CAPTURED,
           start
        ).project(Object[].class).list();
    }
}