import { getToken } from './auth'
import type { Pedido as UIPedido, OrderItem as UIOrderItem } from '@/components/Pedidos/types'

const API = process.env.NEXT_PUBLIC_API_URL!

interface RawPedido {
  id: number
  restaurantName: string
  items?: UIOrderItem[]
  status?: 'PENDIENTE' | 'ACEPTADO' | 'RECHAZADO'
  total: number
}

function getSupplierIdFromToken(): number {
  const token = getToken()
  const sid = parseInt(token, 10)
  return Number.isNaN(sid) ? NaN : sid
}

export async function fetchPedidos(): Promise<UIPedido[]> {
  const token = getToken()
  if (!token) throw new Error('Debes iniciar sesión como proveedor')

  const supplierId = getSupplierIdFromToken()
  if (isNaN(supplierId)) throw new Error('No se pudo extraer tu ID de proveedor del token')

  const res = await fetch(
    `${API}/supplier/orders?supplierId=${supplierId}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }
  )
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Error ${res.status} al obtener pedidos: ${txt}`)
  }

  const raw: RawPedido[] = await res.json()
  return raw.map((o) => ({
    id: o.id,
    restaurantName: o.restaurantName,
    items: o.items ?? [],
    total: o.total,
    status: o.status?.toLowerCase() as UIPedido['status'],
    supplierId,
  }))
}

export async function updateOrderStatus(
  id: number,
  status: 'ACEPTADO' | 'RECHAZADO'
): Promise<void> {
  const token = getToken()
  if (!token) throw new Error('Debes iniciar sesión como proveedor')

  const res = await fetch(
    `${API}/supplier/orders/${id}/status?status=${status}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  )
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Error ${res.status} al cambiar estado: ${txt}`)
  }
}