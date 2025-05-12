package com.itesm.ecommerce.infrastructure.persistence.repository;

import com.itesm.ecommerce.domain.model.Product;
import com.itesm.ecommerce.infrastructure.persistence.entity.CategoryEntity;
import com.itesm.ecommerce.infrastructure.persistence.entity.ProductEntity;
import com.itesm.ecommerce.infrastructure.persistence.mapper.ProductMapper;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import com.itesm.ecommerce.domain.repository.ProductRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ProductRepositoryImpl implements ProductRepository, PanacheRepositoryBase<ProductEntity, Integer> {
    @Inject
    CategoryRepositoryImpl categoryRepository;
    @Override
    @Transactional
    public Product insertProduct(Product product) {
        persist(ProductMapper.toEntity(product));
        flush();
        return product;
    }

    @Override
    @Transactional
    public void assignCategoryToProduct(int productId, int categoryId) {
        ProductEntity productEntity= findById(productId);
        CategoryEntity categoryEntity= categoryRepository.findById(categoryId);
        productEntity.setCategory(categoryEntity);
    }

    @Override
    public List<Product> findAllProducts() {
        List<ProductEntity> productEntities = findAll().list();
        List<Product> productsList= new ArrayList<>();
        for (ProductEntity productEntity : productEntities) {
            productsList.add(ProductMapper.toDomain(productEntity));
        }
        return productsList;
    }

    public ProductEntity findProductById(int id) {
        return findById(id);
    }
}
