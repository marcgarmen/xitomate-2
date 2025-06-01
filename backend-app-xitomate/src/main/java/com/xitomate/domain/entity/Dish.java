package com.xitomate.domain.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "dish")
public class Dish {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    public User restaurant;

    public String nombre;
    public String descripcion;
    public BigDecimal precio;
    public String categoria;
    public Boolean activo;

    @OneToMany(mappedBy = "dish", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<DishIngredient> ingredientes;
} 