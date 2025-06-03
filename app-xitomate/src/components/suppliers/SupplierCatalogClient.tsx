'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/suppliers/ProductCard'
import CartPanel from '@/components/suppliers/CartPanel'
import {
  getToken,
  fetchSupplierCatalog,
  fetchSuppliers,
  ProductApi,
  SupplierApi,
} from '@/service/auth'

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

  useEffect(() => {
    const run = async () => {
      try {
        const list = await fetchSuppliers()
        setSupplier(list.find(s => s.id === supplierId) ?? null)
      } catch {}

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

  const qtyOf = (id: number) => cart.find(i => i.id === id)?.cantidad ?? 0

  const addProduct = (p: ProductApi) =>
    setCart(c =>
      c.some(i => i.id === p.id)
        ? c.map(i =>
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
    setCart(c => c.filter(i => i.id !== id))

  const toggleProduct = (p: ProductApi) =>
    qtyOf(p.id) ? removeProduct(p.id) : addProduct(p)

  const addById = (id: number) => {
    const p = products.find(p => p.id === id)
    if (p) addProduct(p)
  }

  if (error) return <p className="text-red-600">{error}</p>
  if (!products.length) return <p>Cargando...</p>

  const heading = supplier
    ? `Productos ofrecidos por ${supplier.nombre || 'sin nombre'}`
    : 'Productos ofrecidos'

  return (
    <div className="relative">
      <h1 className="mb-1 text-3xl font-bold">{heading}</h1>

      <p className="mb-4 text-sm text-gray-600">
        Haz clic en un producto para añadirlo o quitarlo del carrito.
      </p>

      <section>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {products.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              selected={!!qtyOf(p.id)}
              onToggle={toggleProduct}
            />
          ))}
        </div>
      </section>

      <CartPanel items={cart} onAdd={addById} onRemove={removeProduct} />
    </div>
  )
}