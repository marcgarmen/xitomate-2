'use client'

import { useState } from 'react'
import { Button } from '@/components/Button/Button'
import { SalesTable } from '@/components/sales/SalesTable'
import { InventoryTable } from '@/components/sales/InventoryTable'
import { AddSaleModal } from '@/components/sales/AddSaleModal'
import { AddInventoryModal } from '@/components/sales/AddInventoryModal'
import { useSalesInventory } from './useSalesInventory'
import type { Sale, InventoryItem } from '@/components/sales/types'
import ProtectedRestaurant from '@/components/ProtectedRestaurant'

export default function SalesPage() {
  const {
    dishes,
    sales,
    inventory,
    addOrUpdateSale,
    addOrUpdateInventory,
    deleteSale,
    deleteInventory,
  } = useSalesInventory()

  const [saleModalOpen, setSaleModalOpen] = useState(false)
  const [invModalOpen, setInvModalOpen] = useState(false)
  const [editingSale, setEditingSale] = useState<Sale | null>(null)
  const [editingInv, setEditingInv] = useState<InventoryItem | null>(null)
  const [activeTab, setActiveTab] = useState<'ventas' | 'inventario'>('ventas')

  return (
    <ProtectedRestaurant>
      <main className="min-h-screen bg-[#F2F2F2]">
        <section className="bg-[#E74B6D] text-white py-16 text-center">
          <h1 className="text-4xl font-extrabold mb-2">Ventas e Inventario</h1>
          <p className="text-lg">
            Monitorea el desempeño diario de tu restaurante
          </p>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex gap-4 mb-8">
            <button
              className={`px-6 py-2 rounded-full font-semibold cursor-pointer transition ${
                activeTab === 'ventas'
                  ? 'bg-[#5EBD6C] text-white shadow'
                  : 'text-gray-600 bg-transparent hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('ventas')}
            >
              Ventas
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold cursor-pointer transition ${
                activeTab === 'inventario'
                  ? 'bg-[#5EBD6C] text-white shadow'
                  : 'text-gray-600 bg-transparent hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('inventario')}
            >
              Inventario
            </button>
          </div>

          {activeTab === 'ventas' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Ventas registradas</h2>
                <Button
                  variant="SignupGreen"
                  onClick={() => {
                    setEditingSale(null)
                    setSaleModalOpen(true)
                  }}
                >
                  Registrar venta
                </Button>
              </div>
              <SalesTable
                sales={sales}
                onEdit={(s) => {
                  setEditingSale(s)
                  setSaleModalOpen(true)
                }}
                onDelete={deleteSale}
              />
            </div>
          )}

          {activeTab === 'inventario' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Inventario</h2>
                <Button
                  variant="SignupGreen"
                  onClick={() => {
                    setEditingInv(null)
                    setInvModalOpen(true)
                  }}
                >
                  Registrar inventario
                </Button>
              </div>
              <InventoryTable
                items={inventory}
                onEdit={(i) => {
                  setEditingInv(i)
                  setInvModalOpen(true)
                }}
                onDelete={deleteInventory}
              />
            </div>
          )}
        </div>

        <AddSaleModal
          open={saleModalOpen}
          onClose={() => {
            setSaleModalOpen(false)
            setEditingSale(null)
          }}
          onSave={addOrUpdateSale}
          editSale={editingSale}
          dishes={dishes}
        />

        <AddInventoryModal
          open={invModalOpen}
          onClose={() => {
            setInvModalOpen(false)
            setEditingInv(null)
          }}
          onSave={addOrUpdateInventory}
          editItem={editingInv}
        />
      </main>
    </ProtectedRestaurant>
  )
}