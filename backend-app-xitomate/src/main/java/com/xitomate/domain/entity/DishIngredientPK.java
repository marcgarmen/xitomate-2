package com.xitomate.domain.entity;

import java.io.Serializable;
import java.util.Objects;

public class DishIngredientPK implements Serializable {
    public Long dish;
    public Long supplierProduct;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DishIngredientPK that = (DishIngredientPK) o;
        return Objects.equals(dish, that.dish) &&
               Objects.equals(supplierProduct, that.supplierProduct);
    }

    @Override
    public int hashCode() {
        return Objects.hash(dish, supplierProduct);
    }
} 