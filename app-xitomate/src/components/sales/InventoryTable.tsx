'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import type { InventoryItem } from './types';

interface Props {
  items: InventoryItem[];
  onEdit: (i: InventoryItem) => void;
  onDelete: (id: number) => void;
}

export function InventoryTable({ items, onEdit, onDelete }: Props) {
  if (!items.length) {
    return (
      <p className="text-center text-lg text-gray-500 py-12">
        Aún no has registrado inventario.
      </p>
    );
  }

  return (
    <div className="mt-2">
      <table className="w-full rounded-lg overflow-hidden text-left">
        <thead className="bg-[#9BB968] text-black">
          <tr>
            <th className="p-3">Ingrediente</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Unidad</th>
            <th className="p-3">Actualizado</th>
            <th className="p-3 w-20" />
          </tr>
        </thead>
        <tbody>
          {items.map((i, idx) => (
            <tr
              key={i.id}
              className={idx % 2 ? 'bg-[#EDF6E7]' : 'bg-[#F5FAF2]'}
            >
              <td className="p-3">{i.name}</td>
              <td className="p-3">{i.stock}</td>
              <td className="p-3">{i.unit}</td>
              <td className="p-3">{format(i.updatedAt, 'd/M/yyyy')}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => onEdit(i)}>
                  <Pencil className="size-4" />
                </button>
                <button onClick={() => onDelete(i.id)}>
                  <Trash2 className="size-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}