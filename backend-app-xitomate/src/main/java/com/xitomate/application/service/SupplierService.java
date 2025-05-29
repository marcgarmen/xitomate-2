package com.xitomate.application.service;

import com.xitomate.domain.dto.SupplierViewDTO;
import com.xitomate.domain.entity.User;
import com.xitomate.infrastructure.persistence.repository.SupplierRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class SupplierService {
    
    @Inject
    SupplierRepository repository;

    public List<SupplierViewDTO> listSuppliers(String query, String sortBy, int page, int size) {
        List<User> results = repository.listVisible(query, sortBy, page, size);
        
        return results.stream()
            .map(user -> new SupplierViewDTO(
                user.id,
                user.nombre,
                user.email,
                user.ubicacion
            ))
            .collect(Collectors.toList());
    }
} 