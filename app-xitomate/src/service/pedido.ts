import { getToken } from './auth'
import type { Pedido as UIPedido, OrderItem as UIOrderItem } from '@/components/Pedidos/types'

const API = process.env.NEXT_PUBLIC_API_URL!

function getSupplierIdFromToken(): number {
  const token = getToken()
  const sid = parseInt(token, 10)
  return Number.isNaN(sid) ? NaN : sid
}

export async function fetchPedidos(): Promise<UIPedido[]> {
  const token = getToken()
  if (!token) {
    throw new Error('Debes iniciar sesión como proveedor')
  }

  const supplierId = getSupplierIdFromToken()
  if (isNaN(supplierId)) {
    throw new Error('No se pudo extraer tu ID de proveedor del token')
  }

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

  const text = await res.text()
  let raw: any[]
  try {
    raw = JSON.parse(text)
  } catch (e: any) {
    throw new Error(
      `No se pudo parsear la respuesta de pedidos: ${e.message}. Respuesta del servidor: ${text}`
    )
  }

  return raw.map((o) => {
    const items: UIOrderItem[] = Array.isArray(o.orderProducts)
      ? o.orderProducts.map((op: any) => {
          const quantity =
            op.cantidad != null
              ? typeof op.cantidad === 'number'
                ? op.cantidad
                : parseInt(op.cantidad, 10) || 0
              : 0
          const price =
            op.precioUnitario != null
              ? typeof op.precioUnitario === 'number'
                ? op.precioUnitario
                : parseFloat(op.precioUnitario) || 0
              : 0
          return {
            productName: op.supplierProduct?.nombre ?? 'Producto desconocido',
            quantity,
            unit: (op.supplierProduct?.unidad as UIOrderItem['unit']) ?? 'otro',
            price,
          }
        })
      : []

    const rawTotal = o.total
    const total =
      rawTotal != null
        ? typeof rawTotal === 'number'
          ? rawTotal
          : parseFloat(rawTotal) || 0
        : items.reduce((sum, i) => sum + i.quantity * i.price, 0)

    return {
      id: o.id,
      supplierId,
      restaurantName: o.restaurant?.nombre ?? 'Restaurante desconocido',
      items,
      total,
      status: (o.status ?? 'PENDIENTE').toLowerCase() as UIPedido['status'],
    }
  })
}

export async function updateOrderStatus(
  id: number,
  status: 'ACEPTADO' | 'RECHAZADO'
): Promise<void> {
  const token = getToken()
  if (!token) {
    throw new Error('Debes iniciar sesión como proveedor')
  }

  const res = await fetch(
    `${API}/supplier/orders/${id}/status?status=${status}`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Error ${res.status} al cambiar estado: ${txt}`)
  }
}