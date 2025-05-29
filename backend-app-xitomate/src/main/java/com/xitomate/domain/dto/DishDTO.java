package com.xitomate.domain.dto;

import java.math.BigDecimal;
import java.util.List;

public class DishDTO {
    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private String categoria;
    private List<DishIngredientDTO> ingredientes;

    // Constructor
    public DishDTO() {}

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public List<DishIngredientDTO> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(List<DishIngredientDTO> ingredientes) {
        this.ingredientes = ingredientes;
    }
} 