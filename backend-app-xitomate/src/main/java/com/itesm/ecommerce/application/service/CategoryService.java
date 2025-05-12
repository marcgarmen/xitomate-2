package com.itesm.ecommerce.application.service;

import com.itesm.ecommerce.domain.model.Category;
import com.itesm.ecommerce.domain.repository.CategoryRepository;
import com.itesm.ecommerce.infrastructure.dto.category.CreateCategoryDTO;
import com.itesm.ecommerce.infrastructure.persistence.mapper.CategoryMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class CategoryService {
    @Inject
    CategoryRepository categoryRepository;

    public Category createCategory(CreateCategoryDTO createCategoryDTO) {
        Category category= CategoryMapper.toDomain(createCategoryDTO);
        return categoryRepository.createCategory(category);
    }

    public List<Category> findAllCategories() {
        return categoryRepository.findAllCategories();
    }


}
