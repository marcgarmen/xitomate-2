'use client'

import { useEffect, useState, useRef } from 'react'
import { getToken, SupplierApi } from '@/service/auth'
import {
  fetchSupplierProducts,
  createOrderToSupplier,
  CreateOrderRequest,
  ProductApi,
} from '@/service/supplier'
import { useToast } from '@/components/toast/ToastProvider'
import ProductCard from './ProductCard'
import CartPanel from './CartPanel'
import { supplierChannel } from '@/service/events'

type Props = { supplierId: number }
type CartItem = {
  id: number
  nombre: string
  cantidad: number
  unidad: string
  precio: number
}

export default function SupplierCatalogClient({ supplierId }: Props) {
  const [products, setProducts] = useState<ProductApi[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const bcRef = useRef<BroadcastChannel>(supplierChannel)
  const toast = useToast()

  useEffect(() => {
    bcRef.current.onmessage = () => {
      loadCatalog()
    }
    loadCatalog()
    return () => {}
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
    setCart((c) => {
      const existing = c.find((i) => i.id === p.id)
      const currentQty = existing?.cantidad ?? 0
      if (currentQty >= p.stock) {
        toast('error', `Solo quedan ${p.stock} ${p.unidad}`)
        return c
      }
      if (existing) {
        return c.map((i) =>
          i.id === p.id ? { ...i, cantidad: i.cantidad + 1 } : i
        )
      }
      return [
        ...c,
        { id: p.id, nombre: p.nombre, unidad: p.unidad, precio: p.precio, cantidad: 1 },
      ]
    })

  const removeProduct = (id: number) =>
    setCart((c) => c.filter((i) => i.id !== id))

  async function handlePlaceOrder() {
    if (!cart.length) return
    const body: CreateOrderRequest = {
      supplierId,
      paymentMethod: 'CARD',
      items: cart.map((i) => ({
        supplierProductId: i.id,
        cantidad: i.cantidad,
      })),
    }
    try {
      await createOrderToSupplier(body)
      toast('success', 'Tu pedido está pendiente de aceptación')
      setCart([])
    } catch (err: any) {
      toast('error', err.message || 'Error al generar pedido')
    }
  }

  if (error) return <p className="text-red-600">{error}</p>
  if (!products.length) return <p>Cargando catálogo…</p>

  return (
    <div className="relative">
      <h1 className="text-3xl font-bold mb-6">
        Productos ofrecidos por Proveedor
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            selected={qtyOf(p.id) > 0}
            onToggle={() =>
              qtyOf(p.id) ? removeProduct(p.id) : addProduct(p)
            }
          />
        ))}
      </div>

      <CartPanel
        items={cart}
        onAdd={(id) => {
          const prod = products.find((p) => p.id === id)!
          addProduct(prod)
        }}
        onRemove={removeProduct}
        onCheckout={handlePlaceOrder}
      />
    </div>
  )
}