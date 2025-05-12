package com.itesm.ecommerce.application.service;

import com.itesm.ecommerce.domain.model.Product;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import com.itesm.ecommerce.domain.repository.ProductRepository;

import java.util.List;

@ApplicationScoped
public class ProductService {
    @Inject
    ProductRepository repository;

    public Product createProduct(Product product) {
        return repository.insertProduct(product);
    }

    public void assignCategoryToProduct(int productId, int categoryId) {
        repository.assignCategoryToProduct(productId, categoryId);
    }

    public List<Product> findAllProducts() {
        return repository.findAllProducts();
    }
}
