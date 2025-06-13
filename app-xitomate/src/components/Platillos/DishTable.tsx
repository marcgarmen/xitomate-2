'use client'

import { Pencil, Trash2 } from 'lucide-react'
import type { Dish } from './types'

interface Props {
  dishes: Dish[]
  onEdit: (d: Dish) => void
  onDelete: (id: number) => void
}

export default function DishTable({ dishes, onEdit, onDelete }: Props) {
  if (!dishes.length)
    return (
      <p className="text-center text-lg text-gray-500 py-12">
        Aún no has agregado platillos.
      </p>
    )

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg">
      <table className="min-w-full text-left">
        <thead className="bg-[#7BC47F] text-black">
          <tr>
            <th className="p-4">Platillo</th>
            <th className="p-4">Precio</th>
            <th className="p-4">Ingredientes</th>
            <th className="p-4">Cantidades</th>
            <th className="p-4 w-20" />
          </tr>
        </thead>
        <tbody>
          {dishes.map((d, i) => (
            <tr
              key={d.id}
              className={`${
                i % 2 ? 'bg-white' : 'bg-[#F5FAF2]'
              } hover:bg-[#E6F7EB] transition-colors`}
            >
              <td className="p-4 font-semibold">{d.nombre}</td>
              <td className="p-4 font-semibold">${d.precio.toFixed(2)}</td>
              <td className="p-4">
                {d.ingredientes.map((ing, ii) => (
                  <div key={ii}>{ing.nombreLibre}</div>
                ))}
              </td>
              <td className="p-4">
                {d.ingredientes.map((ing, ii) => (
                  <div key={ii}>
                    {ing.cantidad} {ing.unidad}
                  </div>
                ))}
              </td>
              <td className="p-4 flex gap-2">
                <button onClick={() => onEdit(d)} className="cursor-pointer">
                  <Pencil className="size-4" />
                </button>
                <button onClick={() => onDelete(d.id)} className="cursor-pointer">
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