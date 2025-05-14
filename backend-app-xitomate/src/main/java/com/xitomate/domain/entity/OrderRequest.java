package com.xitomate.domain.entity;

import com.xitomate.domain.enums.OrderStatus;
import com.xitomate.domain.enums.PaymentMethod;
import com.xitomate.domain.enums.PaymentStatus;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "order_request")
public class OrderRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "restaurant_id")
    public User restaurant;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "supplier_id")
    public User supplier;

    @Enumerated(EnumType.STRING)
    public OrderStatus status;
    public LocalDate fecha;
    public BigDecimal total;
    @Enumerated(EnumType.STRING)
    public PaymentMethod paymentMethod;
    @Enumerated(EnumType.STRING)
    public PaymentStatus paymentStatus;
    public String authorizationId;
    public LocalDateTime capturedAt;
    public LocalDateTime voidedAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<OrderProduct> orderProducts;
}
