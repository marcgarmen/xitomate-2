package com.xitomate.domain.entity;

import com.xitomate.domain.enums.UserRole;
import jakarta.persistence.*;

@Entity @Table(name="user")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String email;
    public String password;
    @Enumerated(EnumType.STRING) public UserRole role;
    public String nombre;
    public String ubicacion;
}
