package com.xitomate.infrastructure.persistence.repository;

import com.xitomate.domain.entity.SupplierProduct;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class SupplierProductPanacheRepository implements PanacheRepository<SupplierProduct> {
    public List<SupplierProduct> findAvailable(Long supplierId, int page, int size){
        return find("supplier.id = ?1 and stock > 0 order by fechaActualizacion desc", supplierId)
                .page(page, size)
                .list();
    }

    public List<SupplierProduct> findLowStock(int threshold){
        return find("stock <= ?1 order by stock asc", threshold).list();
    }
}
