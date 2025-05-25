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
import type { InventoryItem } from './types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<InventoryItem, 'id' | 'updatedAt'>, id?: number) => void;
  editItem?: InventoryItem | null;
}

export function AddInventoryModal({
  open,
  onClose,
  onSave,
  editItem,
}: Props) {
  const [name, setName] = useState('');
  const [stock, setStock] = useState<number>(0);
  const [unit, setUnit] = useState('kg');

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setStock(editItem.stock);
      setUnit(editItem.unit);
    } else {
      setName('');
      setStock(0);
      setUnit('kg');
    }
  }, [editItem]);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), stock, unit }, editItem?.id);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editItem ? 'Editar inventario' : 'Registrar inventario'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Ingrediente"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Stock"
            value={stock}
            min={0}
            onChange={(e) => setStock(Number(e.target.value))}
          />

          <select
            className="w-full rounded-md p-2 bg-white border border-input text-sm shadow-sm focus-visible:ring-ring/50 outline-none"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="kg">kg</option>
            <option value="piezas">piezas</option>
            <option value="otro">otro</option>
          </select>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="SignUpRed" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="SignupGreen"
            onClick={handleSave}
            disabled={!name.trim()}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}