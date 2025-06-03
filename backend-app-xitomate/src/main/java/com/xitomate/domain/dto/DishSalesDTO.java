package com.xitomate.domain.dto;

public class DishSalesDTO {
    private String nombre;
    private Integer cantidad;

    // Constructor
    public DishSalesDTO() {}

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
} 