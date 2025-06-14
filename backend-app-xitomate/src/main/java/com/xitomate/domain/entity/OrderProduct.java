package com.xitomate.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_product")
@IdClass(OrderProductPK.class)
public class OrderProduct {
    @Id
    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference
    public OrderRequest order;

    @Id
    @ManyToOne
    @JoinColumn(name = "supplier_product_id")
    public SupplierProduct supplierProduct;

    public Integer cantidad;

    @Column(name = "precio_unitario")
    public BigDecimal precioUnitario;
}