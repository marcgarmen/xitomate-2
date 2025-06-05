'use client';

import { useState } from 'react';
import type { Sale, InventoryItem } from '@/components/sales/types';
import { createSale } from '@/lib/api';

export function useSalesInventory() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const addOrUpdateSale = async (
    data: Omit<Sale, 'id' | 'date'>,
    id?: number
  ) => {
    try {
      // Create the sale through the API
      const saleData = {
        metodoPago: 'CARD', // You might want to make this configurable
        items: [{
          dishId: parseInt(data.dish), // Assuming dish is the ID
          cantidad: data.quantity
        }]
      };
      
      const response = await createSale(saleData);
      
      // Update local state with the response
      if (id) {
        setSales((prev) =>
          prev.map((s) => (s.id === id ? { ...s, ...data } : s))
        );
      } else {
        setSales((prev) => [
          ...prev,
          { id: Date.now(), date: new Date(), ...data },
        ]);
      }
    } catch (error) {
      console.error('Failed to create sale:', error);
      throw error;
    }
  };

  const addOrUpdateInventory = (
    data: Omit<InventoryItem, 'id' | 'updatedAt'>,
    id?: number
  ) => {
    if (id) {
      setInventory((prev) =>
        prev.map((i) => (i.id === id ? { ...i, ...data } : i))
      );
    } else {
      setInventory((prev) => [
        ...prev,
        { id: Date.now(), updatedAt: new Date(), ...data },
      ]);
    }
  };

  const deleteSale = (id: number) =>
    setSales((prev) => prev.filter((s) => s.id !== id));

  const deleteInventory = (id: number) =>
    setInventory((prev) => prev.filter((i) => i.id !== id));

  return {
    sales,
    inventory,
    addOrUpdateSale,
    addOrUpdateInventory,
    deleteSale,
    deleteInventory,
  };
}