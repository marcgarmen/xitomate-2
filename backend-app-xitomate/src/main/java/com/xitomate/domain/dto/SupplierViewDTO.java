package com.xitomate.domain.dto;

public class SupplierViewDTO {
    private Long id;
    private String nombre;
    private String email;
    private String ubicacion;

    public SupplierViewDTO(Long id, String nombre, String email, String ubicacion) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.ubicacion = ubicacion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }
} 