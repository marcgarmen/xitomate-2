'use client'

import { useState, useEffect } from 'react'
import ProtectedSupplier from '@/components/ProtectedSupplier'
import { Button } from '@/components/Button/Button'
import AddProductModal from '@/components/Productos/AddProductModal'
import ProductGrid from '@/components/Productos/ProductGrid'
import type { Product } from '@/components/Productos/types'
import {
  fetchProducts,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from '@/service/product'
import { useToast } from '@/components/toast/ToastProvider'

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const toast = useToast()

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      const list = await fetchProducts()
      setProducts(list.sort((a, b) => b.id - a.id))
    } catch (e: any) {
      console.error('Error cargando productos:', e)
      toast('error', e.message ?? 'No se pudieron cargar los productos.')
      setProducts([])
    }
  }

  async function handleSave(product: Product) {
    const payload = {
      name: product.name,
      price: product.price,
      unit: product.unit,
      stock: product.stock,
    }
    try {
      if (product.id) {
        await updateProductRequest(product.id, payload)
        toast('success', 'Producto actualizado correctamente.')
      } else {
        await createProductRequest(payload)
        toast('success', 'Producto creado correctamente.')
      }
      setModalOpen(false)
      setEditingProduct(null)
      await loadProducts()
    } catch (e: any) {
      console.error('Error guardando producto:', e)
      toast('error', e.message ?? 'No se pudo guardar el producto.')
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteProductRequest(id)
      setProducts(prev => prev.filter(p => p.id !== id))
      toast('success', 'Producto eliminado correctamente.')
    } catch (e: any) {
      console.error('Error borrando producto:', e)
      toast('error', e.message ?? 'No se pudo borrar el producto.')
    }
  }

  function handleEdit(p: Product) {
    setEditingProduct(p)
    setModalOpen(true)
  }

  return (
    <ProtectedSupplier>
      <main className="bg-[#FAF5F0] min-h-screen">
        <div className="container mx-auto max-w-5xl py-10">
          <h1 className="text-3xl font-bold mb-2">Gestionar Productos</h1>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Tus productos</h2>
            <Button variant="SignupGreen" onClick={() => setModalOpen(true)}>
              Nuevo producto
            </Button>
          </div>

          <ProductGrid
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <AddProductModal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false)
              setEditingProduct(null)
            }}
            onSave={handleSave}
            initialProduct={editingProduct ?? undefined}
          />
        </div>
      </main>
    </ProtectedSupplier>
  )
}