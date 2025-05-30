'use client';

import { useState } from 'react';
import { Button } from '@/components/Button/Button';
import { SalesTable } from '@/components/sales/SalesTable';
import { InventoryTable } from '@/components/sales/InventoryTable';
import { AddSaleModal } from '@/components/sales/AddSaleModal';
import { AddInventoryModal } from '@/components/sales/AddInventoryModal';
import { useSalesInventory } from './useSalesInventory';
import type { Sale, InventoryItem } from '@/components/sales/types';

export default function SalesPage() {
  const {
    sales,
    inventory,
    addOrUpdateSale,
    addOrUpdateInventory,
    deleteSale,
    deleteInventory,
  } = useSalesInventory();

  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [invModalOpen, setInvModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [editingInv, setEditingInv] = useState<InventoryItem | null>(null);

  return (
    <main className="bg-[#FAF5F0] min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="SignupGreen" onClick={() => setSaleModalOpen(true)}>
            Registrar venta
          </Button>
          <Button variant="SignupGreen" onClick={() => setInvModalOpen(true)}>
            Registrar inventario
          </Button>
        </div>

        <SalesTable
          sales={sales}
          onEdit={(s) => {
            setEditingSale(s);
            setSaleModalOpen(true);
          }}
          onDelete={deleteSale}
        />

        <InventoryTable
          items={inventory}
          onEdit={(i) => {
            setEditingInv(i);
            setInvModalOpen(true);
          }}
          onDelete={deleteInventory}
        />

        <AddSaleModal
          open={saleModalOpen}
          onClose={() => {
            setSaleModalOpen(false);
            setEditingSale(null);
          }}
          onSave={addOrUpdateSale}
          editSale={editingSale}
        />

        <AddInventoryModal
          open={invModalOpen}
          onClose={() => {
            setInvModalOpen(false);
            setEditingInv(null);
          }}
          onSave={addOrUpdateInventory}
          editItem={editingInv}
        />
      </div>
    </main>
  );
}
