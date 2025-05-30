package com.xitomate.domain.dto;

public class SaleItemDTO {
    private Long dishId;
    private Integer cantidad;

    // Constructor
    public SaleItemDTO() {}

    // Getters y Setters
    public Long getDishId() {
        return dishId;
    }

    public void setDishId(Long dishId) {
        this.dishId = dishId;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
} 