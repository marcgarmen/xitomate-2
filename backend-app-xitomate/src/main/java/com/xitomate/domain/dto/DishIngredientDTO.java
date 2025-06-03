package com.xitomate.domain.dto;

import java.math.BigDecimal;

public class DishIngredientDTO {
    private Long supplierProductId;
    private BigDecimal cantidad;
    private String unidad;
    private String nombreLibre;

    // Constructor
    public DishIngredientDTO() {}

    // Getters y Setters
    public Long getSupplierProductId() {
        return supplierProductId;
    }

    public void setSupplierProductId(Long supplierProductId) {
        this.supplierProductId = supplierProductId;
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

    public String getNombreLibre() {
        return nombreLibre;
    }

    public void setNombreLibre(String nombreLibre) {
        this.nombreLibre = nombreLibre;
    }
} 