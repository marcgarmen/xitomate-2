'use client'
import { useState, useEffect } from 'react'
import ProtectedSupplier from '@/components/ProtectedSupplier'
import OrderList from '@/components/Pedidos/OrderList'
import type { Pedido } from '@/components/Pedidos/types'
import { fetchPedidos, updateOrderStatus } from '@/service/pedido'
import { supplierChannel } from '@/service/events'
import { useToast } from '@/components/toast/ToastProvider'

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const toast = useToast()

  useEffect(() => {
    loadPedidos()
  }, [])

  async function loadPedidos() {
    try {
      const lista = await fetchPedidos()
      setPedidos(lista)
    } catch (e: any) {
      console.error('Error cargando pedidos:', e)
      toast('error', e.message || 'No se pudieron cargar los pedidos')
    }
  }

  async function handleAccept(id: number) {
    try {
      await updateOrderStatus(id, 'ACEPTADO')
      setPedidos((prev) => prev.filter((p) => p.id !== id))
      supplierChannel.postMessage('reload')
    } catch (e: any) {
      console.error('Error aceptando pedido:', e)
      toast('error', e.message || 'No se pudo aceptar el pedido')
    }
  }

  async function handleReject(id: number) {
    try {
      await updateOrderStatus(id, 'RECHAZADO')
      setPedidos((prev) => prev.filter((p) => p.id !== id))
    } catch (e: any) {
      console.error('Error rechazando pedido:', e)
      toast('error', e.message || 'No se pudo rechazar el pedido')
    }
  }

  return (
    <ProtectedSupplier>
      <div className="bg-[#5EBD6C] text-white py-12">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-extrabold">Pedidos Recibidos</h2>
          <p className="mt-2 text-lg">Revisa y gestiona los pedidos de tus clientes</p>
        </div>
      </div>
      <main className="bg-[#FAF5F0] min-h-screen py-10">
        <div className="container mx-auto max-w-5xl px-4">
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