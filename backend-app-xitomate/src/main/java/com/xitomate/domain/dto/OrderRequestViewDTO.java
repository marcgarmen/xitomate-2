package com.xitomate.domain.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class OrderRequestViewDTO {
    public Long id;
    public String restaurantName;
    public String restaurantEmail;
    public String supplierName;
    public String supplierEmail;
    public String status;
    public LocalDate fecha;
    public BigDecimal total;
    public String paymentMethod;

    public OrderRequestViewDTO(Long id, String restaurantName, String restaurantEmail, String supplierName, String supplierEmail, String status, LocalDate fecha, BigDecimal total, String paymentMethod) {
        this.id = id;
        this.restaurantName = restaurantName;
        this.restaurantEmail = restaurantEmail;
        this.supplierName = supplierName;
        this.supplierEmail = supplierEmail;
        this.status = status;
        this.fecha = fecha;
        this.total = total;
        this.paymentMethod = paymentMethod;
    }
} 