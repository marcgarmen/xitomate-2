'use client'

import { Pencil, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import type { InventoryItem } from './types'

interface Props {
  items: InventoryItem[]
  onEdit: (i: InventoryItem) => void
  onDelete: (id: number) => void
}

export function InventoryTable({ items, onEdit, onDelete }: Props) {
  if (!items.length)
    return (
      <p className="text-center text-lg text-gray-500 py-12">
        Aún no has registrado inventario.
      </p>
    )

  const sorted = [...items].sort((a, b) => b.id - a.id)

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg">
      <table className="min-w-full text-left">
        <thead className="bg-[#7BC47F] text-black">
          <tr>
            <th className="p-4">Ingrediente</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Unidad</th>
            <th className="p-4">Actualizado</th>
            <th className="p-4 w-20" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((i, idx) => (
            <tr
              key={i.id}
              className={`${
                idx % 2 ? 'bg-white' : 'bg-[#F5FAF2]'
              } hover:bg-[#E6F7EB] transition-colors`}
            >
              <td className="p-4">{i.name}</td>
              <td className="p-4">{i.stock}</td>
              <td className="p-4">{i.unit}</td>
              <td className="p-4">
                {isNaN(i.updatedAt.getTime()) ? '-' : format(i.updatedAt, 'd/M/yyyy')}
              </td>
              <td className="p-4 flex gap-2">
                <button onClick={() => onEdit(i)} className="cursor-pointer">
                  <Pencil className="size-4" />
                </button>
                <button onClick={() => onDelete(i.id)} className="cursor-pointer">
                  <Trash2 className="size-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}