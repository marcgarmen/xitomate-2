// src/service/analysis.ts
//--------------------------------------------------
// 1.  Types
//--------------------------------------------------

export type DishSales = {
  nombre: string
  cantidad: number
}

export type IngredientUsage = {
  nombre: string
  cantidad: number
  unidad: string
}

export type DailyIncome = {
  date: string
  income: number
}

export type LowStock = {
  nombre: string
  precio: number
  unidad: string
  stock: number
}

export type TopSupplier = {
  topSupplier: string
}

export type InventoryForecast = {
  forecast: string
  inventory: Array<{
    ingredient: string
    stock: number
    unit: string
  }>
}

//--------------------------------------------------
// 2.  API Calls
//--------------------------------------------------

export async function fetchTopDishes(token: string): Promise<DishSales[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/analysis/top-dishes`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('No se pudo obtener top platillos')
  return res.json()
}

export async function fetchIngredientUsage(token: string): Promise<{
  mostUsed: IngredientUsage[]
  leastUsed: IngredientUsage[]
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/analysis/ingredient-usage`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('No se pudo obtener uso de ingredientes')
  return res.json()
}

export async function fetchDailyIncome(token: string): Promise<DailyIncome> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/analysis/daily-income`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('No se pudo obtener ingreso diario')
  return res.json()
}

export async function fetchLowStock(token: string): Promise<LowStock[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/analysis/low-stock`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('No se pudo obtener productos con bajo stock')
  return res.json()
}

export async function fetchTopSupplier(token: string): Promise<TopSupplier> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/analysis/top-supplier`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('No se pudo obtener proveedor más usado')
  return res.json()
}

export async function fetchInventoryForecast(token: string): Promise<InventoryForecast> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/analysis/inventory-forecast`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('No se pudo obtener pronóstico de inventario')
  return res.json()
} 