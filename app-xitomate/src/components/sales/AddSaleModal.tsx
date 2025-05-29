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
}

export function AddSaleModal({ open, onClose, onSave, editSale }: Props) {
  const [dish, setDish] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (editSale) {
      setDish(editSale.dish);
      setQty(editSale.quantity.toString());
      setPrice(editSale.unitPrice.toString());
    } else {
      setDish('');
      setQty('');
      setPrice('');
    }
  }, [editSale]);

  const handleSave = () => {
    const quantity = Number(qty);
    const unitPrice = Number(price);
    if (!dish.trim() || quantity <= 0) return;
    onSave(
      { dish: dish.trim(), quantity, unitPrice },
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
          <Input
            placeholder="Nombre del platillo"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Cantidad"
            value={qty}
            min={1}
            onChange={(e) => setQty(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Precio unitario"
            value={price}
            min={0}
            step={0.01}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <DialogFooter className="pt-4">
          <Button variant="SignUpRed" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="SignupGreen"
            onClick={handleSave}
            disabled={!dish.trim() || Number(qty) <= 0}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}