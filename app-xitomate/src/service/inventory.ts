import { getToken } from './auth'

const API = process.env.NEXT_PUBLIC_API_URL!

export interface InventoryApi {
  id: number
  supplierProductId: number | null
  nombreLibre: string | null
  stock: number
  unit: string
  fechaActualizacion: string
}

export interface InventoryPayload {
  supplierProductId: number | null
  nombreLibre: string | null
  stock: number
  unidad: string
}

export async function fetchInventory(): Promise<InventoryApi[]> {
  const token = getToken()
  const res = await fetch(`${API}/restaurant/analysis/inventory`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Error al obtener inventario')
  return res.json()
}

export async function createInventory(
  data: InventoryPayload
): Promise<InventoryApi> {
  const token = getToken()
  const res = await fetch(`${API}/restaurant/analysis/inventory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Error al crear inventario: ${res.status} ${err}`)
  }

  const text = await res.text()
  if (text) {

    return JSON.parse(text) as InventoryApi
  }

  const all = await fetchInventory()

  const match = all.find(
    (i) =>
      i.nombreLibre === data.nombreLibre &&
      i.stock === data.stock &&
      i.unit === data.unidad
  )
  if (match) {
    return match
  }

  return {
    id: all.length ? all[all.length - 1].id + 1 : Date.now(),
    supplierProductId: data.supplierProductId,
    nombreLibre: data.nombreLibre,
    stock: data.stock,
    unit: data.unidad,
    fechaActualizacion: new Date().toISOString(),
  }
}

export async function updateInventory(
  id: number,
  data: InventoryPayload
): Promise<InventoryApi> {
  const token = getToken()
  const res = await fetch(`${API}/restaurant/analysis/inventory/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al actualizar inventario')

  const text = await res.text()
  if (text) {
    return JSON.parse(text) as InventoryApi
  }
  return {
    id,
    supplierProductId: data.supplierProductId,
    nombreLibre: data.nombreLibre,
    stock: data.stock,
    unit: data.unidad,
    fechaActualizacion: new Date().toISOString(),
  }
}

export async function deleteInventoryById(id: number): Promise<void> {
  const token = getToken()
  const res = await fetch(`${API}/restaurant/analysis/inventory/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Error al eliminar inventario')
}