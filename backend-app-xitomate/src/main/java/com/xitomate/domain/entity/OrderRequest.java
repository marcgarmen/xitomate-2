package com.xitomate.domain.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.xitomate.domain.enums.OrderStatus;
import com.xitomate.domain.enums.PaymentMethod;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "order_request")
public class OrderRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    public User restaurant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    public User supplier;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    public OrderStatus status;

    @Column(name = "fecha")
    public LocalDate fecha;

    @Column(name = "total")
    public BigDecimal total;

    @Enumerated(EnumType.STRING)
    @Column(name = "metodo_pago")
    public PaymentMethod paymentMethod;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    public List<OrderProduct> orderProducts;
}