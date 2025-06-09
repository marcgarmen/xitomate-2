'use client'

import { useState, useEffect } from 'react'
import type { Sale, InventoryItem } from '@/components/sales/types'
import { getToken } from '@/service/auth'
import {
  fetchInventory,
  createInventory,
  updateInventory,
  deleteInventoryById,
  InventoryApi
} from '@/service/inventory'

export function useSalesInventory() {
  const [dishes, setDishes] = useState<
    Array<{ id: number; nombre: string; precio: number }>
  >([])
  const [sales, setSales] = useState<Sale[]>([])
  const [inventory, setInventory] = useState<InventoryItem[]>([])

  useEffect(() => {
    async function fetchDishes() {
      try {
        const token = getToken()
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/restaurant/dishes`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        if (!res.ok) throw new Error('Failed to fetch dishes')
        setDishes(await res.json())
      } catch (e) {
        console.error('Error fetching dishes:', e)
      }
    }
    fetchDishes()
  }, [])

  useEffect(() => {
    if (!dishes.length) return

    async function fetchSales() {
      try {
        const token = getToken()
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/restaurant/sales`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        if (!res.ok) throw new Error('Failed to fetch sales')
        const rawSales = await res.json()
        const mapped: Sale[] = rawSales.flatMap((sale: any) =>
          Array.isArray(sale.items)
            ? sale.items.map((item: any) => {
                const dish = dishes.find(d => d.id === item.dishId)
                return {
                  id: sale.id,
                  dishId: item.dishId,
                  dishName: dish ? dish.nombre : `ID ${item.dishId}`,
                  quantity: item.cantidad,
                  unitPrice: dish ? dish.precio : 0,
                  date: new Date(sale.fecha),
                  metodoPago: sale.metodoPago || ''
                }
              })
            : []
        )
        setSales(mapped)
      } catch (e) {
        console.error('Error fetching sales:', e)
      }
    }
    fetchSales()
  }, [dishes])

  useEffect(() => {
    async function loadInventory() {
      try {
        const raw: InventoryApi[] = await fetchInventory()
        const items = raw.map(i => {
          const dateStr =
            (i as any).fechaActualizacion ?? (i as any).fecha ?? ''
          const parsed = dateStr ? new Date(dateStr) : new Date()
          return {
            id: i.id,
            name: i.nombreLibre ?? '',
            stock: i.stock,
            unit: (i as any).unit ?? '',
            updatedAt: parsed
          } as InventoryItem
        })
        setInventory(items)
      } catch (e) {
        console.error('Error fetching inventory:', e)
      }
    }
    loadInventory()
  }, [dishes])

  const addOrUpdateSale = async (
    data: { dishId: string; quantity: number; metodoPago: string },
    id?: number
  ) => {
    const payload = {
      metodoPago: data.metodoPago,
      items: [
        {
          dishId: parseInt(data.dishId, 10),
          cantidad: data.quantity
        }
      ]
    }
    const token = getToken()

    if (id) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurant/sales/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      )
      if (!res.ok) {
        const txt = await res.text()
        console.error('updateSale →', res.status, txt)
        throw new Error(txt)
      }
      const updated = await res.json()
      const dish = dishes.find(d => d.id === parseInt(data.dishId, 10))
      setSales(prev =>
        prev.map(s =>
          s.id === id
            ? {
                id,
                dishId: parseInt(data.dishId, 10),
                dishName: dish ? dish.nombre : `ID ${data.dishId}`,
                quantity: data.quantity,
                unitPrice: dish ? dish.precio : 0,
                date: new Date(updated.fecha),
                metodoPago: data.metodoPago
              }
            : s
        )
      )
    } else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurant/sales`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      )
      if (!res.ok) {
        const txt = await res.text()
        console.error('createSale →', res.status, txt)
        throw new Error(txt)
      }
      const created = await res.json()
      const dish = dishes.find(d => d.id === parseInt(data.dishId, 10))
      setSales(prev => [
        {
          id: created.id,
          dishId: parseInt(data.dishId, 10),
          dishName: dish ? dish.nombre : `ID ${data.dishId}`,
          quantity: data.quantity,
          unitPrice: dish ? dish.precio : 0,
          date: new Date(created.fecha),
          metodoPago: data.metodoPago
        },
        ...prev
      ])
    }
  }

  const deleteSale = async (id: number) => {
    const token = getToken()
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurant/sales/${id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    if (!res.ok) {
      const txt = await res.text()
      console.error('deleteSale →', res.status, txt)
      throw new Error(txt)
    }
    setSales(prev => prev.filter(s => s.id !== id))
  }

  const addOrUpdateInventory = async (
    data: Omit<InventoryItem, 'id' | 'updatedAt'>,
    id?: number
  ) => {
    if (id) {
      const upd = await updateInventory(id, {
        supplierProductId: null,
        nombreLibre: data.name,
        stock: data.stock,
        unidad: data.unit
      })
      setInventory(prev =>
        prev.map(i =>
          i.id === id
            ? {
                id: upd.id,
                name: upd.nombreLibre ?? '',
                stock: upd.stock,
                unit: upd.unit,
                updatedAt: new Date(upd.fechaActualizacion)
              }
            : i
        )
      )
    } else {
      const created = await createInventory({
        supplierProductId: null,
        nombreLibre: data.name,
        stock: data.stock,
        unidad: data.unit
      })
      setInventory(prev => [
        {
          id: created.id,
          name: created.nombreLibre ?? '',
          stock: created.stock,
          unit: created.unit,
          updatedAt: new Date(created.fechaActualizacion)
        },
        ...prev
      ])
    }
  }

  const deleteInventory = async (id: number) => {
    await deleteInventoryById(id)
    setInventory(prev => prev.filter(i => i.id !== id))
  }

  return {
    dishes,
    sales,
    inventory,
    addOrUpdateSale,
    deleteSale,
    addOrUpdateInventory,
    deleteInventory
  }
}