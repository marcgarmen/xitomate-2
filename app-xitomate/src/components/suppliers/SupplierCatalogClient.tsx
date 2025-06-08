'use client'

import { useEffect, useState, useRef } from 'react'
import { getToken, SupplierApi } from '@/service/auth'
import { fetchSupplierProducts, ProductApi } from '@/service/supplier'
import { supplierChannel } from '@/service/events'
import ProductCard from './ProductCard'
import CartPanel from './CartPanel'

type Props = { supplierId: number }
type CartItem = {
  id: number
  nombre: string
  cantidad: number
  unidad: string
  precio: number
}

export default function SupplierCatalogClient({ supplierId }: Props) {
  const [supplier, setSupplier] = useState<SupplierApi | null>(null)
  const [products, setProducts] = useState<ProductApi[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [error, setError] = useState<string | null>(null)

  const bcRef = useRef<BroadcastChannel>(supplierChannel)

  useEffect(() => {
    bcRef.current.onmessage = (evt) => {
      const msg = evt.data as any
      if (msg.supplierId !== supplierId) return

      if (msg.type === 'deleted') {
        // eliminación local sin recargar el fetch
        setProducts((prev) => prev.filter((p) => p.id !== msg.id))
      } else {
        // created / updated
        loadCatalog()
      }
    }
    loadCatalog()
    return () => void bcRef.current.close()
  }, [supplierId])

  async function loadCatalog() {
    try {
      const tok = getToken()
      if (!tok) throw new Error('Debes iniciar sesión')
      const cat = await fetchSupplierProducts(supplierId)
      setProducts(cat)
    } catch {
      setError('No se pudo cargar el catálogo.')
    }
  }

  const qtyOf = (id: number) => cart.find((i) => i.id === id)?.cantidad ?? 0
  const addProduct = (p: ProductApi) =>
    setCart((c) =>
      c.some((i) => i.id === p.id)
        ? c.map((i) =>
            i.id === p.id ? { ...i, cantidad: i.cantidad + 1 } : i
          )
        : [
            ...c,
            {
              id: p.id,
              nombre: p.nombre,
              unidad: p.unidad,
              precio: p.precio,
              cantidad: 1,
            },
          ]
    )
  const removeProduct = (id: number) =>
    setCart((c) => c.filter((i) => i.id !== id))
  const toggleProduct = (p: ProductApi) =>
    qtyOf(p.id) ? removeProduct(p.id) : addProduct(p)

  if (error) return <p className="text-red-600">{error}</p>
  if (!products.length) return <p>Cargando...</p>

  return (
    <div className="relative">
      <h1 className="text-3xl font-bold mb-2">
        Productos ofrecidos por {supplier?.nombre ?? 'Proveedor'}
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            selected={qtyOf(p.id) > 0}
            onToggle={() => toggleProduct(p)}
          />
        ))}
      </div>

      <CartPanel items={cart} onAdd={(id) => addProduct(products.find(p => p.id === id)!)} onRemove={removeProduct} />
    </div>
  )
}