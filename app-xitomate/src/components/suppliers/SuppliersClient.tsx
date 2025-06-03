'use client'

import { useEffect, useState } from 'react'
import SupplierCard from '@/components/suppliers/SupplierCard'
import { getToken, SupplierApi, fetchSupplierCatalog } from '@/service/auth'

export default function SuppliersClient() {
  const [suppliers, setSuppliers] = useState<
    (SupplierApi & { topProducts: string[] })[]
  >([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSuppliers = async () => {
      const token = getToken()
      if (!token) {
        setError('Debes iniciar sesión para ver proveedores.')
        return
      }

      try {
        const base: SupplierApi[] = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/suppliers`,
          { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' },
        ).then(r => (r.ok ? r.json() : Promise.reject(r)))

        const withProducts = await Promise.all(
          base.map(async s => {
            try {
              const catalog = await fetchSupplierCatalog(s.id, token)
              const names = catalog.slice(0, 3).map(p => p.nombre)
              return { ...s, topProducts: names }
            } catch {
              return { ...s, topProducts: [] }
            }
          }),
        )

        setSuppliers(withProducts)
      } catch (e) {
        console.error(e)
        setError('No se pudieron cargar los proveedores.')
      }
    }

    loadSuppliers()
  }, [])

  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
      {suppliers.map(s => (
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
