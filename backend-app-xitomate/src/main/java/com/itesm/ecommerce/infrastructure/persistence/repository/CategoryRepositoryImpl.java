package com.itesm.ecommerce.infrastructure.persistence.repository;

import com.itesm.ecommerce.domain.model.Category;
import com.itesm.ecommerce.domain.repository.CategoryRepository;
import com.itesm.ecommerce.infrastructure.persistence.entity.CategoryEntity;
import com.itesm.ecommerce.infrastructure.persistence.mapper.CategoryMapper;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.checkerframework.checker.units.qual.A;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class CategoryRepositoryImpl implements CategoryRepository, PanacheRepositoryBase<CategoryEntity,Integer> {


    @Override
    @Transactional
    public Category createCategory(Category category) {
        CategoryEntity ce= CategoryMapper.toEntity(category);
        ce.persist();
        return CategoryMapper.toDomain(ce);
    }

    @Override
    public Category findCategoryById(int id) {
        return CategoryMapper.toDomain(findById(id));
    }

    @Override
    public List<Category> findAllCategories() {
        List<CategoryEntity> categoryEntities = findAll().list();
        List<Category> categoryList= new ArrayList<>();
        for (CategoryEntity ce: categoryEntities) {
            categoryList.add(CategoryMapper.toDomain(ce));
        }
        return categoryList;
    }
}
