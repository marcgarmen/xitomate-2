package com.xitomate.domain.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "supplier_product")
public class SupplierProduct {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    public User supplier;

    public String nombre;
    public BigDecimal precio;
    public String unidad;
    public Integer stock;
}