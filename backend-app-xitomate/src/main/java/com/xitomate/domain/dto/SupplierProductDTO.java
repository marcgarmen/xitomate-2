package com.xitomate.domain.dto;

import java.math.BigDecimal;

public class SupplierProductDTO {
    private String nombre;
    private BigDecimal precio;
    private String unidad;
    private Integer stock;

    // Constructor
    public SupplierProductDTO() {}

    public SupplierProductDTO(String nombre, BigDecimal precio, String unidad, Integer stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.unidad = unidad;
        this.stock = stock;
    }

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public String getUnidad() {
        return unidad;
    }

    public void setUnidad(String unidad) {
        this.unidad = unidad;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }
} 