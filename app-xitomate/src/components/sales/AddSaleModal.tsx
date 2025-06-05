'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/Button/Button';
import { useState, useEffect } from 'react';
import type { Sale } from './types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Sale, 'id' | 'date'>, id?: number) => void;
  editSale?: Sale | null;
  dishes?: Array<{ id: number; nombre: string; precio: number }>;
}

export function AddSaleModal({ open, onClose, onSave, editSale, dishes = [] }: Props) {
  const [selectedDishId, setSelectedDishId] = useState('');
  const [qty, setQty] = useState('');
  const [metodoPago, setMetodoPago] = useState('CARD');

  useEffect(() => {
    if (editSale) {
      setSelectedDishId(editSale.dish);
      setQty(editSale.quantity.toString());
    } else {
      setSelectedDishId('');
      setQty('');
      setMetodoPago('CARD');
    }
  }, [editSale]);

  const handleSave = () => {
    const quantity = Number(qty);
    if (!selectedDishId || quantity <= 0) return;
    
    const selectedDish = dishes.find(d => d.id.toString() === selectedDishId);
    if (!selectedDish) return;

    onSave(
      { 
        dish: selectedDishId,
        quantity,
        unitPrice: selectedDish.precio,
        metodoPago
      },
      editSale?.id
    );
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editSale ? 'Editar venta' : 'Registrar venta'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <select
            className="w-full rounded-md p-2 bg-white border border-input text-sm shadow-sm focus-visible:ring-ring/50 outline-none"
            value={selectedDishId}
            onChange={(e) => setSelectedDishId(e.target.value)}
          >
            <option value="">Seleccionar plato</option>
            {dishes.map((dish) => (
              <option key={dish.id} value={dish.id}>
                {dish.nombre} - ${dish.precio}
              </option>
            ))}
          </select>

          <Input
            type="number"
            placeholder="Cantidad"
            value={qty}
            min={1}
            onChange={(e) => setQty(e.target.value)}
          />

          <select
            className="w-full rounded-md p-2 bg-white border border-input text-sm shadow-sm focus-visible:ring-ring/50 outline-none"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="CARD">Tarjeta</option>
            <option value="CASH">Efectivo</option>
          </select>
        </div>

        <DialogFooter>
          <Button variant="SignUpRed" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="SignupGreen"
            onClick={handleSave}
            disabled={!selectedDishId || !qty || Number(qty) <= 0}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}