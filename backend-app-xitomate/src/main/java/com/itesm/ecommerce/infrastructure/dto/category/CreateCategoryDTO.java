package com.itesm.ecommerce.infrastructure.dto.category;

import com.itesm.ecommerce.domain.model.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateCategoryDTO {
    private String name;
}
