package com.itesm.ecommerce.domain.repository;


import com.itesm.ecommerce.domain.model.Product;

import java.util.List;

public interface ProductRepository {
    public Product insertProduct(Product product);
    public void assignCategoryToProduct(int productId, int categoryId);
    public List<Product> findAllProducts();
}
