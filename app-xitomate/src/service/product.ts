import { getToken } from './auth'
import { supplierChannel } from './events'

const API = process.env.NEXT_PUBLIC_API_URL!

export interface Product {
  id: number
  name: string
  price: number
  unit: 'kg' | 'piezas' | 'otro'
  stock: number
}

interface ProductApi {
  id: number
  nombre: string
  precio: number
  unidad: string
  stock: number
}

function getSupplierId(): number {
  const token = getToken()
  const i = parseInt(token, 10)
  return isNaN(i) ? NaN : i
}

export async function fetchProducts(): Promise<Product[]> {
  const token = getToken()
  const sid = getSupplierId()
  const res = await fetch(`${API}/suppliers/${sid}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Error ${res.status} al obtener productos`)
  const data = (await res.json()) as ProductApi[]
  return data.map((p) => ({
    id: p.id,
    name: p.nombre,
    price: p.precio,
    unit: p.unidad as Product['unit'],
    stock: p.stock,
  }))
}

export async function createProductRequest(
  payload: Omit<Product, 'id'>
): Promise<Product> {
  const token = getToken()
  const sid = getSupplierId()

  const res = await fetch(`${API}/suppliers/${sid}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombre: payload.name,
      precio: payload.price,
      unidad: payload.unit,
      stock: payload.stock,
    }),
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`POST error ${res.status}: ${txt}`)
  }

  const c = (await res.json()) as ProductApi
  const prod = {
    id: c.id,
    name: c.nombre,
    price: c.precio,
    unit: c.unidad as Product['unit'],
    stock: c.stock,
  }

  supplierChannel.postMessage({ type: 'created', supplierId: sid })
  return prod
}

export async function updateProductRequest(
  id: number,
  payload: Omit<Product, 'id'>
): Promise<Product> {
  const token = getToken()
  const sid = getSupplierId()

  await fetch(`${API}/suppliers/${sid}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombre: payload.name,
      precio: payload.price,
      unidad: payload.unit,
      stock: payload.stock,
    }),
  }).catch(() => {})

  supplierChannel.postMessage({ type: 'updated', supplierId: sid, id })
  return { id, ...payload }
}

export async function deleteProductRequest(id: number): Promise<void> {
  const token = getToken()
  const sid = getSupplierId()

  try {
    const invRes = await fetch(`${API}/restaurant/analysis/inventory`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (invRes.ok) {
      const invs = (await invRes.json()) as Array<{
        id: number
        supplierProductId: number | null
        nombreLibre: string | null
        stock: number
        unit: string
      }>
      await Promise.all(
        invs
          .filter((i) => i.supplierProductId === id)
          .map((i) =>
            fetch(`${API}/restaurant/analysis/inventory/${i.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                supplierProductId: null,
                nombreLibre: i.nombreLibre,
                stock: i.stock,
                unidad: i.unit,
              }),
            })
          )
      )
    }
  } catch (e) {
    console.warn('⚠️ [product] No se pudo desvincular inventario (lo ignoramos):', e)
  }

  const res = await fetch(`${API}/suppliers/${sid}/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    const txt = await res.text()
    if (res.status === 500 && txt.includes('foreign key')) {
      throw new Error(
        'No puedes borrar este producto porque está siendo usado en inventario de restaurantes.'
      )
    }
    throw new Error(`DELETE error ${res.status}: ${txt}`)
  }

  supplierChannel.postMessage({ type: 'deleted', supplierId: sid, id })
}