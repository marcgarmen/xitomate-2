'use client'

import { useState, useEffect, useCallback } from 'react'
import ProtectedSupplier from '@/components/ProtectedSupplier'
import { Button } from '@/components/Button/Button'
import { Product, ProductFormData } from '@/components/Productos/types'
import { useToast } from '@/components/toast/ToastProvider'

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const toast = useToast()

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      if (!response.ok) throw new Error('Error al cargar productos')
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      toast('error', 'No se pudieron cargar los productos.')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  async function handleSave(product: ProductFormData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })

      if (!response.ok) throw new Error('Error al guardar el producto')
      
      await loadProducts()
      toast('success', 'Producto guardado exitosamente')
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Error al guardar el producto')
    }
  }

  async function handleDelete(id: number) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Error al eliminar el producto')
      
      await loadProducts()
      toast('success', 'Producto eliminado exitosamente')
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Error al eliminar el producto')
    }
  }

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <ProtectedSupplier>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Productos</h1>
        <Button onClick={() => setEditingProduct({} as Product)}>Nuevo Producto</Button>
        
        <div className="mt-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 mb-2">
              <h3>{product.nombre}</h3>
              <p>Precio: ${product.precio}</p>
              <p>Stock: {product.stock} {product.unidad}</p>
              <Button onClick={() => setEditingProduct(product)}>Editar</Button>
              <Button onClick={() => handleDelete(product.id)}>Eliminar</Button>
            </div>
          ))}
        </div>
      </div>
    </ProtectedSupplier>
  )
}