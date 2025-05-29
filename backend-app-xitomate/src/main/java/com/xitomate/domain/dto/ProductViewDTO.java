package com.xitomate.domain.dto;

import java.math.BigDecimal;

public class ProductViewDTO {
    public Long id;
    public String nombre;
    public String categoria;
    public String unidad;
    public BigDecimal precio;
    public Integer stock;
    public Boolean organico;
    public Double rating;
    public String proveedorNombre;
    public String proveedorLocalidad;

    public ProductViewDTO() {
    }

    public ProductViewDTO(Long id, String nombre, String categoria, String unidad,
                         BigDecimal precio, Integer stock, Boolean organico,
                         Double rating, String proveedorNombre, String proveedorLocalidad) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.unidad = unidad;
        this.precio = precio;
        this.stock = stock;
        this.organico = organico;
        this.rating = rating;
        this.proveedorNombre = proveedorNombre;
        this.proveedorLocalidad = proveedorLocalidad;
    }
} 