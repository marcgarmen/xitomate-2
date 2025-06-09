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
  if (sales.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500 py-12">
        Aún no has registrado ventas.
      </p>
    )
  }

  return (
    <div className="mt-2">
      <table className="w-full rounded-lg overflow-hidden text-left">
        <thead className="bg-[#9BB968] text-black">
          <tr>
            <th className="p-3">Platillo</th>
            <th className="p-3">Cantidad</th>
            <th className="p-3">Precio u.</th>
            <th className="p-3">Método</th>
            <th className="p-3">Fecha</th>
            <th className="p-3 w-20"></th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s, idx) => (
            <tr
              key={`${s.id}-${idx}`}
              className={idx % 2 ? 'bg-[#EDF6E7]' : 'bg-[#F5FAF2]'}
            >
              <td className="p-3">{s.dishName}</td>
              <td className="p-3">{s.quantity}</td>
              <td className="p-3">${s.unitPrice.toFixed(2)}</td>
              <td className="p-3">{s.metodoPago}</td>
              <td className="p-3">{format(s.date, 'd/M/yyyy')}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => onEdit(s)}>
                  <Pencil className="size-4" />
                </button>
                <button onClick={() => onDelete(s.id)}>
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