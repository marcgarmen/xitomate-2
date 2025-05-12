package com.itesm.ecommerce.application.useCase.category;

import com.itesm.ecommerce.application.service.CategoryService;
import com.itesm.ecommerce.domain.model.Category;
import com.itesm.ecommerce.infrastructure.dto.category.CreateCategoryDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class CreateCategoryUseCase {
    @Inject
    CategoryService categoryService;

    public Category execute(CreateCategoryDTO createCategoryDTO) {
        return categoryService.createCategory(createCategoryDTO);
    }
}
