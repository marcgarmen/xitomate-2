package com.itesm.ecommerce.infrastructure.persistence.mapper;

import com.itesm.ecommerce.domain.model.Product;
import com.itesm.ecommerce.infrastructure.persistence.entity.ProductEntity;

public class ProductMapper {

    public static ProductEntity toEntity(Product product) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setName(product.getName());
        productEntity.setPrice(product.getPrice());
        productEntity.setDescription(product.getDescription());
        return productEntity;
    }

    public static Product toDomain(ProductEntity productEntity) {
        Product product = new Product();
        product.setId(productEntity.getId());
        product.setName(productEntity.getName());
        product.setPrice(productEntity.getPrice());
        product.setDescription(productEntity.getDescription());
        if(productEntity.getCategory() != null) {
            product.setCategory(CategoryMapper.toDomain(productEntity.getCategory()));
        }
        return product;
    }

    public static Product toDomainIgnoringCategory(ProductEntity productEntity) {
        Product product = new Product();
        product.setName(productEntity.getName());
        product.setId(productEntity.getId());
        product.setPrice(productEntity.getPrice());
        product.setDescription(productEntity.getDescription());

        return product;
    }

}
