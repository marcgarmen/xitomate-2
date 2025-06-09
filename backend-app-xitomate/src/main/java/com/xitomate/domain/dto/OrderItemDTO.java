package com.xitomate.domain.dto;

public class OrderItemDTO {
    private Long supplierProductId;
    private Integer cantidad;

    public OrderItemDTO() {}

    public Long getSupplierProductId() {
        return supplierProductId;
    }

    public void setSupplierProductId(Long supplierProductId) {
        this.supplierProductId = supplierProductId;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
} 