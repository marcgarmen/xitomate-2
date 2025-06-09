package com.xitomate.domain.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "restaurant_inventory")
public class RestaurantInventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public BigDecimal precio;
    public Integer stock;
    public String unidad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    public User restaurant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_product_id")
    public SupplierProduct supplierProduct;

    // Para ingredientes libres
    public String nombreLibre;
} 