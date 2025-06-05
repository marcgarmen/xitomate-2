"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/Button/Button";
import { SalesTable } from "@/components/sales/SalesTable";
import { InventoryTable } from "@/components/sales/InventoryTable";
import { AddSaleModal } from "@/components/sales/AddSaleModal";
import { AddInventoryModal } from "@/components/sales/AddInventoryModal";
import { useSalesInventory } from "./useSalesInventory";
import type { Sale, InventoryItem } from "@/components/sales/types";
import ProtectedRestaurant from "@/components/ProtectedRestaurant";

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
  const [dishes, setDishes] = useState<Array<{ id: number; nombre: string; precio: number }>>([]);

  useEffect(() => {
    // Fetch dishes when component mounts
    const fetchDishes = async () => {
      try {
        const response = await fetch('/api/restaurant/dishes');
        if (!response.ok) throw new Error('Failed to fetch dishes');
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  return (
    <ProtectedRestaurant>
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
            dishes={dishes}
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
    </ProtectedRestaurant>
  );
}