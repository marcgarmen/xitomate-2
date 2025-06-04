'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

type Item = {
  id: number
  nombre: string
  cantidad: number
  unidad: string
  precio: number
}

type Props = {
  items: Item[]
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

export default function CartPanel({ items, onAdd, onRemove }: Props) {
  const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0)

  return (
    <aside className="fixed right-0 top-20 z-20 w-72 max-h-[80vh] overflow-y-auto rounded-l-2xl border-l bg-white p-4 shadow-lg">
      <h3 className="mb-4 text-lg font-semibold">Carrito</h3>

      {items.length === 0 && <p className="text-sm">Vacío. Añade productos</p>}

      {items.map(i => (
        <div
          key={i.id}
          className="mb-3 space-y-1 border-b pb-3 last:border-none"
        >
          <p className="text-sm">{i.nombre}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs">
              {i.cantidad} {i.unidad} × ${i.precio}
            </span>
            <div className="flex gap-1">
              <button
                className="rounded bg-gray-200 px-2"
                onClick={() => onRemove(i.id)}
              >
                −
              </button>
              <button
                className="rounded bg-gray-200 px-2"
                onClick={() => onAdd(i.id)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <div className="mt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button className="mt-4 w-full flex items-center gap-2" disabled>
            <Check className="h-4 w-4" />
            Ir a pagar (Stripe)
          </Button>
        </>
      )}
    </aside>
  )
}