'use client';

import { Pencil, Trash2 } from 'lucide-react';
import type { Dish } from './types';

interface Props {
  dishes: Dish[];
  onEdit: (idx: number) => void;
  onDelete: (idx: number) => void;
}

export default function DishTable({ dishes, onEdit, onDelete }: Props) {
  if (!dishes.length)
    return (
      <p className="text-center text-lg text-gray-500 py-12">
        Aún no has agregado platillos.
      </p>
    );

  return (
    <table className="w-full rounded-lg overflow-hidden text-left">
      <thead className="bg-[#9BB968] text-black">
        <tr>
          <th className="p-3">Platillo</th>
          <th className="p-3">Ingredientes</th>
          <th className="p-3">Cantidades</th>
          <th className="p-3 w-20" />
        </tr>
      </thead>
      <tbody>
        {dishes.map((dish, idx) => (
          <tr
            key={idx}
            className={idx % 2 ? 'bg-[#EDF6E7]' : 'bg-[#F5FAF2]'}
          >
            <td className="p-3 font-medium">{dish.name}</td>
            <td className="p-3">
              {dish.ingredients.map((i) => (
                <div key={i.name}>{i.name}</div>
              ))}
            </td>
            <td className="p-3">
              {dish.ingredients.map((i) => (
                <div key={`${i.name}-qty`}>{i.quantity}</div>
              ))}
            </td>
            <td className="p-3 flex gap-2">
              <button onClick={() => onEdit(idx)}>
                <Pencil className="size-4" />
              </button>
              <button onClick={() => onDelete(idx)}>
                <Trash2 className="size-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}