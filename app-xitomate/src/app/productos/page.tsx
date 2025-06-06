"use client";

import { useState, useEffect } from "react";
import ProtectedSupplier from "@/components/ProtectedSupplier";
import { Button } from "@/components/Button/Button";
import AddProductModal from "@/components/Productos/AddProductModal";
import ProductGrid from "@/components/Productos/ProductGrid";
import type { Product } from "@/components/Productos/types";
import {
  fetchProducts,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from "@/service/product";

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const list = await fetchProducts();
      if (!list) {
        setProducts([]);
        return;
      }
      setProducts(list.sort((a, b) => b.id - a.id));
    } catch (e) {
      setProducts([]);
    }
  }

  async function handleSave(product: Product) {
    try {
      const payload = {
        name: product.name,
        price: product.price,
        unit: product.unit,
        stock: product.stock,
      };
      if (product.id) {
        await updateProductRequest(product.id, payload);
      } else {
        await createProductRequest(payload);
      }
      setModalOpen(false);
      setEditingProduct(null);
      await loadProducts();
    } catch (e) {}
  }

  function handleEdit(p: Product) {
    setEditingProduct(p);
    setModalOpen(true);
  }

  async function handleDelete(id: number) {
    try {
      await deleteProductRequest(id);
      await loadProducts();
    } catch (e) {}
  }

  return (
    <ProtectedSupplier>
      <main className="bg-[#FAF5F0] min-h-screen">
        <div className="container mx-auto max-w-5xl py-10">
          <h1 className="text-3xl font-bold mb-2">Gestionar Productos</h1>
          <p className="text-gray-700 mb-6">
            Agrega, edita o elimina los productos que ofreces.
          </p>
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
              setModalOpen(false);
              setEditingProduct(null);
            }}
            onSave={handleSave}
            initialProduct={editingProduct ?? undefined}
          />
        </div>
      </main>
    </ProtectedSupplier>
  );
}