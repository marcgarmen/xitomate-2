package com.xitomate.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xitomate.domain.enums.UserRole;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(unique = true)
    public String email;

    @Column(name = "password_hash")
    public String passwordHash;

    @Column(name = "password_salt")
    public String passwordSalt;

    @Enumerated(EnumType.STRING)
    public UserRole role;

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant")
    public List<Dish> dishes;

    public String nombre;
    public String ubicacion;

    @Transient // This field is not persisted to the database
    public String password;
}
