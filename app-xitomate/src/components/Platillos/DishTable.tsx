"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { Dish } from "./types";

interface Props {
  dishes: Dish[];
  onEdit: (d: Dish) => void;
  onDelete: (id: number) => void;
}

export default function DishTable({ dishes, onEdit, onDelete }: Props) {
  if (!dishes.length) {
    return (
      <p className="text-center text-lg text-gray-500 py-12">
        Aún no has agregado platillos.
      </p>
    );
  }

  return (
    <table className="w-full rounded-lg overflow-hidden text-left">
      <thead className="bg-[#9BB968] text-black">
        <tr>
          <th className="p-3">Platillo</th>
          <th className="p-3">Precio</th>
          <th className="p-3">Ingredientes</th>
          <th className="p-3">Cantidades</th>
          <th className="p-3 w-20"></th>
        </tr>
      </thead>
      <tbody>
        {dishes.map((dish, idx) => (
          <tr
            key={dish.id}
            className={idx % 2 ? "bg-[#EDF6E7]" : "bg-[#F5FAF2]"}
          >
            <td className="p-3 font-medium">{dish.nombre}</td>

            <td className="p-3 font-medium">${dish.precio.toFixed(2)}</td>

            <td className="p-3">
              {dish.ingredientes.map((i, ii) => (
                <div key={`${i.nombreLibre || i.supplierProductId}-${ii}`}>
                  {i.nombreLibre ?? `ID ${i.supplierProductId}`}
                </div>
              ))}
            </td>

            <td className="p-3">
              {dish.ingredientes.map((i, ii) => (
                <div
                  key={`${i.nombreLibre || i.supplierProductId}-qty-${ii}`}
                >
                  {i.cantidad} {i.unidad}
                </div>
              ))}
            </td>

            <td className="p-3 flex gap-2">
              <button onClick={() => onEdit(dish)}>
                <Pencil className="size-4" />
              </button>
              <button onClick={() => onDelete(dish.id)}>
                <Trash2 className="size-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}