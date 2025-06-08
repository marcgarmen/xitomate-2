'use client'

import type { Pedido } from './types'
import OrderCard from './OrderCard'

interface Props {
  pedidos: Pedido[]
  onAccept: (id: number) => void
  onReject: (id: number) => void
}

export default function OrderList({ pedidos, onAccept, onReject }: Props) {
  if (pedidos.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500 py-12">
        No hay pedidos pendientes.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pedidos.map((p) => (
        <OrderCard
          key={p.id}
          pedido={p}
          onAccept={() => onAccept(p.id)}
          onReject={() => onReject(p.id)}
        />
      ))}
    </div>
  )
}