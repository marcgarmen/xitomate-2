package com.xitomate.application.usecase;

import com.xitomate.domain.service.CatalogService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class GetAvailableCatalogUseCase {
    @Inject CatalogService service;
    public List<?> execute(Long supplierId, int page, int size){
        return service.getCatalog(supplierId, page, size);
    }
}
