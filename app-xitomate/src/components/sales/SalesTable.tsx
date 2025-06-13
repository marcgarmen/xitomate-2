'use client'

import { Pencil, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import type { Sale } from './types'

interface Props {
  sales: Sale[]
  onEdit: (s: Sale) => void
  onDelete: (id: number) => void
}

export function SalesTable({ sales, onEdit, onDelete }: Props) {
  if (!sales.length)
    return (
      <p className="text-center text-lg text-gray-500 py-12">
        Aún no has registrado ventas.
      </p>
    )

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg">
      <table className="min-w-full text-left">
        <thead className="bg-[#7BC47F] text-black">
          <tr>
            <th className="p-4">Platillo</th>
            <th className="p-4">Cantidad</th>
            <th className="p-4">Precio u.</th>
            <th className="p-4">Método</th>
            <th className="p-4">Fecha</th>
            <th className="p-4 w-20" />
          </tr>
        </thead>
        <tbody>
          {sales.map((s, i) => (
            <tr
              key={s.id}
              className={`${
                i % 2 ? 'bg-white' : 'bg-[#F5FAF2]'
              } hover:bg-[#E6F7EB] transition-colors`}
            >
              <td className="p-4">{s.dishName}</td>
              <td className="p-4">{s.quantity}</td>
              <td className="p-4">${s.unitPrice.toFixed(2)}</td>
              <td className="p-4">{s.metodoPago}</td>
              <td className="p-4">{format(s.date, 'd/M/yyyy')}</td>
              <td className="p-4 flex gap-2">
                <button onClick={() => onEdit(s)} className="cursor-pointer">
                  <Pencil className="size-4" />
                </button>
                <button onClick={() => onDelete(s.id)} className="cursor-pointer">
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