package com.xitomate.application.useCase;

import com.xitomate.application.service.TopProductService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class GetTopProductsUseCase {

    @Inject
    TopProductService service;

    public List<Object[]> execute(LocalDate start, LocalDate end, int limit) {
        return service.topProducts(start, end, limit);
    }
}
