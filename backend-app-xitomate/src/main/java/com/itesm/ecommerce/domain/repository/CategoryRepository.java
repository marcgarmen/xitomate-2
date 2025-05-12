package com.itesm.ecommerce.domain.repository;

import com.itesm.ecommerce.domain.model.Category;

import java.util.List;

public interface CategoryRepository {

    Category createCategory(Category category);
    Category findCategoryById(int id);
    List<Category> findAllCategories();

}
