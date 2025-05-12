package com.itesm.ecommerce.application.useCase.products;

import com.itesm.ecommerce.application.service.ProductService;
import com.itesm.ecommerce.domain.model.Product;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class ListProductsUseCase {
    @Inject
    ProductService productService;

    public List<Product> execute() {
        return productService.findAllProducts();
    }

}
