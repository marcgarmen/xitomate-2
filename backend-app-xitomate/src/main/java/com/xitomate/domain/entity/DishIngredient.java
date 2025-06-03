package com.xitomate.domain.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "dish_ingredient")
public class DishIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "dish_ingredient_seq")
    @SequenceGenerator(name = "dish_ingredient_seq", sequenceName = "dish_ingredient_seq", allocationSize = 1)
    @Column(name = "id")
    public Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id", nullable = false)
    public Dish dish;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_product_id")
    public SupplierProduct supplierProduct;

    @Column(nullable = false)
    public BigDecimal cantidad;

    @Column(nullable = false)
    public String unidad;

    // Campos para ingredientes libres
    @Column(name = "nombre_libre")
    public String nombreLibre;
} 