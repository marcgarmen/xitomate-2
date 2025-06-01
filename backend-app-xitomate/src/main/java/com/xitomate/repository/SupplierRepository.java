package com.xitomate.repository;

import com.xitomate.domain.entity.User;
import com.xitomate.domain.enums.UserRole;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class SupplierRepository implements PanacheRepository<User> {
    
    public List<User> listAll() {
        return find("role", UserRole.SUPPLIER).list();
    }
} 