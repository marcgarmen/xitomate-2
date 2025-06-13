'use client'
import { useState, useEffect, useCallback } from 'react'
import ProtectedSupplier from '@/components/ProtectedSupplier'
import { Button } from '@/components/Button/Button'
import { Product, ProductFormData } from '@/components/Productos/types'
import AddProductModal from '@/components/Productos/AddProductModal'
import { useToast } from '@/components/toast/ToastProvider'
import {
  fetchProducts,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from '@/service/product'

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const toast = useToast()

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      const data = await fetchProducts()
      setProducts(data)
      setError(null)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido'
      setError(msg)
      toast('error', 'No se pudieron cargar los productos.')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  async function handleSave(form: ProductFormData & { id?: number }) {
    try {
      if (form.id) {
        await updateProductRequest(form.id, {
          name: form.name,
          price: form.price,
          unit: form.unit,
          stock: form.stock,
        })
        toast('success', 'Producto actualizado correctamente')
      } else {
        await createProductRequest({
          name: form.name,
          price: form.price,
          unit: form.unit,
          stock: form.stock,
        })
        toast('success', 'Producto creado correctamente')
      }
      setModalOpen(false)
      setEditingProduct(null)
      await loadProducts()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al guardar el producto'
      toast('error', msg)
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteProductRequest(id)
      toast('success', 'Producto eliminado exitosamente')
      await loadProducts()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al eliminar el producto'
      toast('error', msg)
    }
  }

  if (loading) return <div className="p-8 text-center">Cargando...</div>
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>

  return (
    <ProtectedSupplier>
      <div className="bg-[#5EBD6C] text-white py-12">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-extrabold">Gestiona tus Productos</h2>
          <p className="mt-2 text-lg">Agrega, edita o elimina productos de manera sencilla.</p>
        </div>
      </div>
      <main className="bg-gray-100 min-h-screen py-10">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-extrabold">Productos</h1>
              <p className="text-gray-500 mt-1">
                Total: <span className="font-medium">{products.length}</span> productos
              </p>
            </div>
            <Button
              variant="SignupGreen"
              onClick={() => { setEditingProduct(null); setModalOpen(true) }}
            >
              Nuevo Producto
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600">
                    Precio: <span className="font-medium">${product.price}</span>
                  </p>
                  <p className="text-gray-600">
                    Stock: <span className="font-medium">{product.stock} {product.unit}</span>
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="OutlineGreen"
                    onClick={() => { setEditingProduct(product); setModalOpen(true) }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="SignUpRed"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <AddProductModal
        open={modalOpen}
        initialProduct={editingProduct ?? undefined}
        onClose={() => { setModalOpen(false); setEditingProduct(null) }}
        onSave={handleSave}
      />
    </ProtectedSupplier>
  )
}