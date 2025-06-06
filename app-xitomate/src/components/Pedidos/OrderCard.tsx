"use client";

import { Button } from "@/components/Button/Button";
import type { Pedido } from "./types";

interface Props {
  pedido: Pedido;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

export default function OrderCard({ pedido, onAccept, onReject }: Props) {
  const total = pedido.items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{pedido.restaurantName}</h3>
        {pedido.items.map((i, idx) => (
          <p key={idx}>
            {i.productName} — {i.quantity} {i.unit} × ${i.price.toFixed(2)}
          </p>
        ))}
        <p className="font-medium mt-2">Total: ${total.toFixed(2)}</p>
        <p className="text-sm text-gray-500">
          {pedido.status ?? "pendiente"}
        </p>
      </div>
      <div className="mt-4 flex gap-2">
        <Button
          variant="SignupGreen"
          onClick={() => onAccept(pedido.id)}
          disabled={pedido.status !== undefined}
        >
          Aceptar
        </Button>
        <Button
          variant="SignUpRed"
          onClick={() => onReject(pedido.id)}
          disabled={pedido.status !== undefined}
        >
          Rechazar
        </Button>
      </div>
    </div>
  );
}