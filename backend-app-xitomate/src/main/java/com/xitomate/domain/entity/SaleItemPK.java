package com.xitomate.domain.entity;

import java.io.Serializable;
import java.util.Objects;

public class SaleItemPK implements Serializable {
    public Long sale;
    public Long dish;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SaleItemPK that = (SaleItemPK) o;
        return Objects.equals(sale, that.sale) &&
               Objects.equals(dish, that.dish);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sale, dish);
    }
} 