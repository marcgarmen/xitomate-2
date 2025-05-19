package com.xitomate.domain.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "supplier_product")
public class SupplierProduct {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    public User supplier;

    public String nombre;
    public String categoria;
    public String unidad;
    public BigDecimal precio;
    public Integer stock;
    public Boolean organico;
    public Boolean activo;
    public Double rating;

    @Column(name = "fecha_actualizacion")
    public LocalDateTime fechaActualizacion;
}