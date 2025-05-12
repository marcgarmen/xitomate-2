package com.itesm.ecommerce.application.useCase.products;


import com.itesm.ecommerce.infrastructure.dto.product.AssignCategoryDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import com.itesm.ecommerce.application.service.ProductService;
@ApplicationScoped
public class AssignProductCategoryUseCase {
    @Inject
    ProductService productService;

    public void execute(AssignCategoryDTO assignCategoryDTO) {
        productService.assignCategoryToProduct(assignCategoryDTO.getProductId(), assignCategoryDTO.getCategoryId());
    }

}
