import { getToken } from './auth'

const API = process.env.NEXT_PUBLIC_API_URL!

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
  const res = await fetch(`${API}/suppliers/${supplierId}/products`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('No se pudo obtener productos del proveedor')
  return res.json()
}