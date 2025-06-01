'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/suppliers/ProductCard'
import {
  getToken,
  fetchSupplierCatalog,
  fetchSuppliers,
  ProductApi,
  SupplierApi,
} from '@/service/auth'

type Props = { supplierId: number }

export default function SupplierCatalogClient({ supplierId }: Props) {
  const [supplier, setSupplier] = useState<SupplierApi | null>(null)
  const [products, setProducts] = useState<ProductApi[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      // 1. obtener proveedor
      try {
        const list = await fetchSuppliers()
        setSupplier(list.find(s => s.id === supplierId) ?? null)
      } catch {
        /* no es crítico, continuamos */
      }

      // 2. obtener catálogo con token
      const token = getToken()
      if (!token) {
        setError('Debes iniciar sesión para ver productos.')
        return
      }

      try {
        const catalog = await fetchSupplierCatalog(supplierId, token)
        setProducts(catalog)
      } catch {
        setError('No se pudo cargar el catálogo.')
      }
    }

    run()
  }, [supplierId])

  if (error) return <p className="text-red-600">{error}</p>
  if (!products.length) return <p>Cargando...</p>

  return (
    <>
      {supplier && (
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-1">
            {supplier.nombre ?? 'Sin nombre'}
          </h1>
          <p className="text-gray-700">
            {supplier.ubicacion ?? 'Sin ubicación'}
          </p>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">Productos ofrecidos</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  )
}