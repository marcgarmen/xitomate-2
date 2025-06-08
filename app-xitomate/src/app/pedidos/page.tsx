'use client'

import { useState, useEffect } from 'react'
import ProtectedSupplier from '@/components/ProtectedSupplier'
import OrderList from '@/components/Pedidos/OrderList'
import type { Pedido } from '@/components/Pedidos/types'
import { fetchPedidos, updateOrderStatus } from '@/service/pedido'
import { supplierChannel } from '@/service/events'

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  useEffect(() => {
    loadPedidos()
  }, [])

  async function loadPedidos() {
    try {
      const lista = await fetchPedidos()
      setPedidos(lista)
    } catch (e) {
      console.error('Error cargando pedidos:', e)
    }
  }

  async function handleAccept(id: number) {
    try {
      await updateOrderStatus(id, 'ACEPTADO')
      setPedidos((prev) => prev.filter((p) => p.id !== id))

      supplierChannel.postMessage('reload')
    } catch (e) {
      console.error('Error aceptando pedido:', e)
    }
  }

  async function handleReject(id: number) {
    try {
      await updateOrderStatus(id, 'RECHAZADO')
      setPedidos((prev) => prev.filter((p) => p.id !== id))
    } catch (e) {
      console.error('Error rechazando pedido:', e)
    }
  }

  return (
    <ProtectedSupplier>
      <main className="bg-[#FAF5F0] min-h-screen">
        <div className="container mx-auto max-w-5xl py-10">
          <h1 className="text-3xl font-bold mb-4">Pedidos recibidos</h1>
          <OrderList
            pedidos={pedidos}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        </div>
      </main>
    </ProtectedSupplier>
  )
}