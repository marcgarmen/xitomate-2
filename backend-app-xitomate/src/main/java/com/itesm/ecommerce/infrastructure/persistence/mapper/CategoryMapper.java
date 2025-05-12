package com.itesm.ecommerce.infrastructure.persistence.mapper;


import com.itesm.ecommerce.domain.model.Category;
import com.itesm.ecommerce.domain.model.Product;
import com.itesm.ecommerce.infrastructure.dto.category.CreateCategoryDTO;
import com.itesm.ecommerce.infrastructure.persistence.entity.CategoryEntity;
import com.itesm.ecommerce.infrastructure.persistence.entity.ProductEntity;

import java.util.ArrayList;
import java.util.List;

public class CategoryMapper {

    public static CategoryEntity toEntity(Category category) {
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setId(category.getId());
        categoryEntity.setName(category.getName());
        return categoryEntity;
    }
    public static Category toDomain(CategoryEntity categoryEntity) {
        Category category = new Category();
        category.setId(categoryEntity.getId());
        category.setName(categoryEntity.getName());
        List<Product> products = new ArrayList<>();
        if(categoryEntity.getProducts() != null) {
            for(ProductEntity productEntity : categoryEntity.getProducts()) {
                products.add(ProductMapper.toDomainIgnoringCategory(productEntity));
            }
        }
        category.setProducts(products);
        return category;
    }

    public static Category toDomain(CreateCategoryDTO createCategoryDTO) {
        Category category = new Category();
        category.setName(createCategoryDTO.getName());
        return category;
    }

}
