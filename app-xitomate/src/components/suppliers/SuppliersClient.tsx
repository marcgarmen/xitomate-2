'use client'

import { useEffect, useState, useRef } from 'react'
import SupplierCard from './SupplierCard'
import { getToken, SupplierApi, fetchSuppliers } from '@/service/auth'
import { fetchSupplierProducts, ProductApi } from '@/service/supplier'
import { supplierChannel } from '@/service/events'

export default function SuppliersClient() {
  const [suppliers, setSuppliers] = useState<(SupplierApi & { topProducts: string[] })[]>([])
  const [error, setError] = useState<string | null>(null)

  const bcRef = useRef<BroadcastChannel>(supplierChannel)

  useEffect(() => {
    bcRef.current.onmessage = () => {
      loadSuppliers()
    }
    loadSuppliers()
    return () => {
      bcRef.current.close()
    }
  }, [])

  async function loadSuppliers() {
    const token = getToken()
    if (!token) {
      setError('Debes iniciar sesión para ver proveedores.')
      return
    }
    try {
      const base = await fetchSuppliers()
      const withProducts = await Promise.all(
        base.map(async (s) => {
          try {
            const cat: ProductApi[] = await fetchSupplierProducts(s.id)
            const sorted = [...cat].sort((a, b) => b.id - a.id)
            const top = sorted.slice(0, 3).map((p) => p.nombre)
            return { ...s, topProducts: top }
          } catch {
            return { ...s, topProducts: [] }
          }
        })
      )
      setSuppliers(withProducts)
    } catch {
      setError('No se pudieron cargar los proveedores.')
    }
  }

  if (error) return <p className="text-red-600">{error}</p>
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
      {suppliers.map((s) => (
        <SupplierCard
          key={s.id}
          supplier={{
            id: s.id.toString(),
            name: s.nombre ?? 'Sin nombre',
            coverage: s.ubicacion ?? 'Sin ubicación',
            avatar: '/proveedor-icon.svg',
            topProducts: s.topProducts,
          }}
        />
      ))}
    </div>
  )
}