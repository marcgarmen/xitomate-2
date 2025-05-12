package com.itesm.ecommerce.infrastructure.dto.cart;

import io.quarkus.arc.All;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddProductToCartDTO {
    private int productId;
    private int quantity;
}
