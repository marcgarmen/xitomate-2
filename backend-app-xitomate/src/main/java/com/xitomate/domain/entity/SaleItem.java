package com.xitomate.domain.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sale_item")
@IdClass(SaleItemPK.class)
public class SaleItem {
    @Id @ManyToOne @JoinColumn(name = "sale_id")
    public Sale sale;

    @Id @ManyToOne @JoinColumn(name = "dish_id")
    public Dish dish;

    public Integer cantidad;
    public BigDecimal precioUnitario;
    public BigDecimal subtotal;
} 