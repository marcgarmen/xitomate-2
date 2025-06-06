"use client";

import type { Product } from "./types";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductGrid({ products, onEdit, onDelete }: Props) {
  if (!products.length) {
    return (
      <p className="text-center text-lg text-gray-500 py-12">
        Aún no has agregado productos.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}