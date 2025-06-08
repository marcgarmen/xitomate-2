import { getToken } from './auth'

export type ProductApi = {
  id: number
  nombre: string
  unidad: string
  precio: number
  stock: number
}

export async function fetchSupplierProducts(
  supplierId: number
): Promise<ProductApi[]> {
  const token = getToken()
  if (!token) throw new Error('No hay token válido para obtener productos')

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/suppliers/${supplierId}/products`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }
  )
  if (!res.ok) {
    const text = await res.text()
    console.error('fetchSupplierProducts →', res.status, text)
    throw new Error('Error al obtener productos del proveedor')
  }
  return res.json()
}

export interface CreateOrderRequest {
  supplierId: number
  paymentMethod: 'CARD' | 'UNPAID'
  items: { supplierProductId: number; cantidad: number }[]
}

export async function createOrderToSupplier(
  req: CreateOrderRequest
): Promise<any> {
  const token = getToken()
  if (!token) throw new Error('No hay token válido para crear orden')

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurant/orders`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    }
  )
  if (!res.ok) {
    const text = await res.text()
    console.error('createOrderToSupplier →', res.status, text)
    throw new Error(text || 'Error al crear orden')
  }
  return res.json()
}