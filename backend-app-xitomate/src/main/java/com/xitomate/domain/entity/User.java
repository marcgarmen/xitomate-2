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

    public String password;

    @Enumerated(EnumType.STRING)
    public UserRole role;

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant")
    public List<Dish> dishes;

    public String nombre;
    public String ubicacion;
}
