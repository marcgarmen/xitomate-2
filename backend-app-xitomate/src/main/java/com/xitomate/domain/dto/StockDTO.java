package com.xitomate.domain.dto;

import java.math.BigDecimal;

public class StockDTO {
    private Long supplierProductId;
    private BigDecimal cantidad;

    // Constructor
    public StockDTO() {}

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
} 