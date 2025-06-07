package com.xitomate.domain.dto;

import java.math.BigDecimal;

public class InventoryDTO {
    private Long supplierProductId;
    private String nombreLibre;
    private Integer stock;
    private Integer cantidad; // Alias para stock
    private String unidad;
    private BigDecimal precio;

    public Long getSupplierProductId() { return supplierProductId; }
    public void setSupplierProductId(Long supplierProductId) { this.supplierProductId = supplierProductId; }
    public String getNombreLibre() { return nombreLibre; }
    public void setNombreLibre(String nombreLibre) { this.nombreLibre = nombreLibre; }
    public Integer getStock() { 
        return stock != null ? stock : cantidad; 
    }
    public void setStock(Integer stock) { this.stock = stock; }
    public Integer getCantidad() { 
        return cantidad != null ? cantidad : stock; 
    }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
    public String getUnidad() { return unidad; }
    public void setUnidad(String unidad) { this.unidad = unidad; }
    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }
} 