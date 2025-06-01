package com.xitomate.domain.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "dish_ingredient")
@IdClass(DishIngredientPK.class)
public class DishIngredient {
    @Id @ManyToOne @JoinColumn(name = "dish_id")
    public Dish dish;

    @Id @ManyToOne @JoinColumn(name = "supplier_product_id")
    public SupplierProduct supplierProduct;

    public BigDecimal cantidad;
    public String unidad;
} 