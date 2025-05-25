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
import { Plus, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Dish } from './types';

type Row = { id: number; name: string; quantity: string };

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (dish: Dish) => void;
  initialDish?: Dish | null;
}

export default function AddDishModal({
  open,
  onClose,
  onSave,
  initialDish,
}: Props) {
  const [dishName, setDishName] = useState('');
  const [rows, setRows] = useState<Row[]>([{ id: 1, name: '', quantity: '' }]);

  useEffect(() => {
    if (initialDish) {
      setDishName(initialDish.name);
      setRows(
        initialDish.ingredients.map((ing, i) => ({
          id: i + 1,
          name: ing.name,
          quantity: ing.quantity.toString(),
        }))
      );
    } else {
      setDishName('');
      setRows([{ id: 1, name: '', quantity: '' }]);
    }
  }, [initialDish]);

  const addRow = () => {
    const last = rows.at(-1)!;
    if (!last.name.trim() || last.quantity === '') return;
    setRows([...rows, { id: Date.now(), name: '', quantity: '' }]);
  };

  const removeRow = (id: number) => setRows(rows.filter((r) => r.id !== id));

  const changeRow = (
    id: number,
    field: 'name' | 'quantity',
    value: string
  ) => setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const handleSave = () => {
    if (!dishName.trim()) return;
    const ingredients = rows
      .filter((r) => r.name.trim() && r.quantity !== '')
      .map((r) => ({ name: r.name.trim(), quantity: Number(r.quantity) }));
    if (!ingredients.length) return;

    onSave({ name: dishName.trim(), ingredients });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialDish ? 'Editar platillo' : 'Nuevo platillo'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Nombre del platillo"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
          />

          {rows.map((row, idx) => (
            <div key={row.id} className="flex items-center gap-2">
              {idx === rows.length - 1 ? (
                <button
                  onClick={addRow}
                  className="p-1 rounded-full border border-[#A1C374] text-[#A1C374] hover:bg-[#A1C374]/10"
                >
                  <Plus size={16} />
                </button>
              ) : (
                <button
                  onClick={() => removeRow(row.id)}
                  className="p-1 rounded-full border border-[#F45E62] text-[#F45E62] hover:bg-[#F45E62]/10"
                >
                  <Minus size={16} />
                </button>
              )}

              <Input
                className="flex-1"
                placeholder="Ingrediente"
                value={row.name}
                onChange={(e) =>
                  changeRow(row.id, 'name', e.target.value)
                }
              />
              <Input
                className="w-24 text-center"
                type="number"
                min={0}
                placeholder="Cantidad"
                value={row.quantity}
                onChange={(e) =>
                  changeRow(row.id, 'quantity', e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <DialogFooter className="pt-4">
          <Button variant="SignUpRed" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="SignupGreen"
            onClick={handleSave}
            disabled={!dishName.trim()}
          >
            {initialDish ? 'Guardar' : 'Agregar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}