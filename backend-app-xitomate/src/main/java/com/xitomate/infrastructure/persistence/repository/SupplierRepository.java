package com.xitomate.infrastructure.persistence.repository;

import com.xitomate.domain.entity.User;
import com.xitomate.domain.enums.UserRole;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class SupplierRepository implements PanacheRepository<User> {
    
    public List<User> listVisible(String query, String sortBy, int page, int size) {
        if (query != null && !query.isEmpty()) {
            return find("role = ?1 and (LOWER(nombre) LIKE LOWER(?2) OR LOWER(email) LIKE LOWER(?2) OR LOWER(ubicacion) LIKE LOWER(?2))", 
                        UserRole.SUPPLIER, "%" + query + "%")
                    .page(page, size)
                    .list();
        } else {
            return find("role = ?1", UserRole.SUPPLIER)
                    .page(page, size)
                    .list();
        }
    }
} 