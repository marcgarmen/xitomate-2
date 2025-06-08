'use client'

import { Button } from '@/components/Button/Button'
import type { Pedido } from './types'

interface Props {
  pedido: Pedido
  onAccept: (id: number) => void
  onReject: (id: number) => void
}

export default function OrderCard({ pedido, onAccept, onReject }: Props) {
  const hasItems = pedido.items.length > 0

  const total = hasItems
    ? pedido.items.reduce((sum, i) => sum + i.quantity * i.price, 0)
    : pedido.total

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
      <div className="space-y-2">

        <div className="flex items-center space-x-3">
          <img
            src="/restaurante-icon.svg"
            alt="Avatar restaurante"
            className="w-8 h-8 rounded-full object-cover"
          />
          <h3 className="text-lg font-semibold">{pedido.restaurantName}</h3>
        </div>

        {hasItems &&
          pedido.items.map((i, idx) => (
            <p key={idx}>
              {i.productName} — {i.quantity} {i.unit} × ${i.price.toFixed(2)}
            </p>
          ))}

        <p className="font-medium mt-2">Total: ${total.toFixed(2)}</p>
        <p className="text-sm text-gray-500">
          {pedido.status ?? 'pendiente'}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          variant="SignupGreen"
          onClick={() => onAccept(pedido.id)}
          disabled={pedido.status !== 'pendiente'}
        >
          Aceptar
        </Button>
        <Button
          variant="SignUpRed"
          onClick={() => onReject(pedido.id)}
          disabled={pedido.status !== 'pendiente'}
        >
          Rechazar
        </Button>
      </div>
    </div>
  )
}