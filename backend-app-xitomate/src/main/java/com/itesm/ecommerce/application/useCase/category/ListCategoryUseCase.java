package com.itesm.ecommerce.application.useCase.category;

import com.itesm.ecommerce.application.service.CategoryService;
import com.itesm.ecommerce.domain.model.Category;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class ListCategoryUseCase {

    @Inject
    CategoryService categoryService;

    public List<Category> execute() {
        return categoryService.findAllCategories();
    }
}
