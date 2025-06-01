package com.xitomate.domain.dto;

import java.math.BigDecimal;

public class IngredientUsageDTO {
    private String nombre;
    private BigDecimal cantidad;
    private String unidad;

    // Constructor
    public IngredientUsageDTO() {}

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }

    public String getUnidad() {
        return unidad;
    }

    public void setUnidad(String unidad) {
        this.unidad = unidad;
    }
} 