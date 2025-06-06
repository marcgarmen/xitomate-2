'use client'

import { useState, useEffect } from 'react'
import type { Sale, InventoryItem } from '@/components/sales/types'
import { getToken } from '@/service/auth'

export function useSalesInventory() {
  const [dishes, setDishes] = useState<Array<{ id: number; nombre: string; precio: number }>>([])
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
        const data = await res.json()
        setDishes(data)
      } catch (e) {
        console.error('Error fetching dishes:', e)
      }
    }
    fetchDishes()
  }, [])

  useEffect(() => {
    if (dishes.length === 0) return

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

        const mappedSales: Sale[] = rawSales.flatMap((sale: any) => {
          if (!Array.isArray(sale.items) || sale.items.length === 0) {
            return []
          }
          return sale.items.map((item: any) => {
            const dishObj = dishes.find(d => d.id === item.dishId)
            return {
              id: sale.id,
              dishId: item.dishId,
              dishName: dishObj ? dishObj.nombre : `ID ${item.dishId}`,
              quantity: item.cantidad,
              unitPrice: dishObj ? dishObj.precio : 0,
              date: new Date(sale.fecha),
              metodoPago: sale.metodoPago || ''
            } as Sale
          })
        })

        setSales(mappedSales)
      } catch (e) {
        console.error('Error fetching sales:', e)
      }
    }

    fetchSales()
  }, [dishes])

  const addOrUpdateSale = async (
    data: { dishId: string; quantity: number; metodoPago: string },
    id?: number
  ) => {
    try {
      const salePayload = {
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
            body: JSON.stringify(salePayload)
          }
        )
        if (!res.ok) {
          const txt = await res.text()
          console.error('updateSale →', res.status, txt)
          throw new Error(txt)
        }
        const updatedSale = await res.json()
        const dishObj = dishes.find(d => d.id === parseInt(data.dishId, 10))
        setSales(prev =>
          prev.map(s =>
            s.id === id
              ? {
                  id,
                  dishId: parseInt(data.dishId, 10),
                  dishName: dishObj ? dishObj.nombre : `ID ${data.dishId}`,
                  quantity: data.quantity,
                  unitPrice: dishObj ? dishObj.precio : 0,
                  date: new Date(updatedSale.fecha),
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
            body: JSON.stringify(salePayload)
          }
        )
        if (!res.ok) {
          const txt = await res.text()
          console.error('createSale →', res.status, txt)
          throw new Error(txt)
        }
        const created = await res.json()
        const dishObj = dishes.find(d => d.id === parseInt(data.dishId, 10))

        setSales(prev => [
          {
            id: created.id,
            dishId: parseInt(data.dishId, 10),
            dishName: dishObj ? dishObj.nombre : `ID ${data.dishId}`,
            quantity: data.quantity,
            unitPrice: dishObj ? dishObj.precio : 0,
            date: new Date(created.fecha),
            metodoPago: data.metodoPago
          },
          ...prev
        ])
      }
    } catch (e) {
      console.error('Failed to create/update sale:', e)
      throw e
    }
  }

  const deleteSale = async (id: number) => {
    try {
      const token = getToken()
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurant/sales/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (!res.ok) {
        const txt = await res.text()
        console.error('deleteSale →', res.status, txt)
        throw new Error(txt)
      }
      setSales(prev => prev.filter(s => s.id !== id))
    } catch (e) {
      console.error('Failed to delete sale:', e)
      throw e
    }
  }

  const addOrUpdateInventory = (data: Omit<InventoryItem, 'id' | 'updatedAt'>, id?: number) => {
    if (id) {
      setInventory(prev => prev.map(i => (i.id === id ? { ...i, ...data } : i)))
    } else {
      setInventory(prev => [
        ...prev,
        { id: Date.now(), updatedAt: new Date(), ...data }
      ])
    }
  }
  const deleteInventory = (id: number) => setInventory(prev => prev.filter(i => i.id !== id))

  return {
    dishes,
    sales,
    inventory,
    addOrUpdateSale,
    addOrUpdateInventory,
    deleteSale,
    deleteInventory
  }
}