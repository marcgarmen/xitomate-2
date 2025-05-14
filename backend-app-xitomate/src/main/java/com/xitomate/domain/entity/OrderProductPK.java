package com.xitomate.domain.entity;

import java.io.Serializable;
import java.util.Objects;

public class OrderProductPK implements Serializable {
    public Long order;
    public Long supplierProduct;

    @Override public boolean equals(Object o){return o instanceof OrderProductPK pk && Objects.equals(order, pk.order) && Objects.equals(supplierProduct, pk.supplierProduct);}
    @Override public int hashCode(){return Objects.hash(order, supplierProduct);} }
