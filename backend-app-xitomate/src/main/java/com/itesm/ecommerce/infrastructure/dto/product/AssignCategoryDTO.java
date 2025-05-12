package com.itesm.ecommerce.infrastructure.dto.product;

import io.quarkus.arc.All;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssignCategoryDTO {

    private int categoryId;
    private int productId;
}
