"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "./types";

interface Props {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="mb-1">Precio: ${product.price.toFixed(2)}</p>
        <p className="mb-1">Unidad: {product.unit}</p>
        <p>Stock: {product.stock}</p>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button onClick={() => onEdit(product)}>
          <Pencil size={16} />
        </button>
        <button onClick={() => onDelete(product.id)}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}