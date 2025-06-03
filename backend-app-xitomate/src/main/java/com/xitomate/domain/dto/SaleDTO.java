package com.xitomate.domain.dto;

import java.util.List;

public class SaleDTO {
    private String metodoPago;
    private List<SaleItemDTO> items;

    // Constructor
    public SaleDTO() {}

    // Getters y Setters
    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public List<SaleItemDTO> getItems() {
        return items;
    }

    public void setItems(List<SaleItemDTO> items) {
        this.items = items;
    }
} 