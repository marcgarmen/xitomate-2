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
    deleteInventory
  } = useSalesInventory()

  const [saleModalOpen, setSaleModalOpen] = useState(false)
  const [invModalOpen, setInvModalOpen] = useState(false)
  const [editingSale, setEditingSale] = useState<Sale | null>(null)
  const [editingInv, setEditingInv] = useState<InventoryItem | null>(null)
  const [activeTab, setActiveTab] = useState<'ventas' | 'inventario'>('ventas')

  return (
    <ProtectedRestaurant>
      <main className="bg-[#FAF5F0] min-h-screen px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Registra tus ventas e inventario</h1>
          <p className="text-gray-600 mb-8">
            Monitorea y administra las ventas e inventario de tu restaurante desde aquí
          </p>

          <div className="mb-6 border-b border-gray-300">
            <button
              className={`px-4 py-2 -mb-px ${
                activeTab === 'ventas'
                  ? 'border-b-2 border-green-600 font-medium'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('ventas')}
            >
              Ventas
            </button>
            <button
              className={`ml-4 px-4 py-2 -mb-px ${
                activeTab === 'inventario'
                  ? 'border-b-2 border-green-600 font-medium'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('inventario')}
            >
              Inventario
            </button>
          </div>

          {activeTab === 'ventas' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Ventas registradas</h2>
                <Button
                  variant="SignupGreen"
                  onClick={() => {
                    setActiveTab('ventas')
                    setSaleModalOpen(true)
                  }}
                >
                  Registrar venta
                </Button>
              </div>
              <SalesTable
                sales={sales}
                onEdit={(sale) => {
                  setActiveTab('ventas')
                  setEditingSale(sale)
                  setSaleModalOpen(true)
                }}
                onDelete={deleteSale}
              />
            </div>
          )}

          {activeTab === 'inventario' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Inventario</h2>
                <Button
                  variant="SignupGreen"
                  onClick={() => {
                    setActiveTab('inventario')
                    setInvModalOpen(true)
                  }}
                >
                  Registrar inventario
                </Button>
              </div>
              <InventoryTable
                items={inventory}
                onEdit={(item) => {
                  setActiveTab('inventario')
                  setEditingInv(item)
                  setInvModalOpen(true)
                }}
                onDelete={deleteInventory}
              />
            </div>
          )}

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
        </div>
      </main>
    </ProtectedRestaurant>
  )
}