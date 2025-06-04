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
import {
  getToken,
  searchSupplierProducts,
  ProductSuggestion,
} from '@/service/auth';

type Row = {
  id: number;
  name: string;
  quantity: string;
  suggestion?: ProductSuggestion | null;
};

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
  const [suggestions, setSuggestions] = useState<
    Record<number, ProductSuggestion[]>
  >({});

  useEffect(() => {
    if (initialDish) {
      setDishName(initialDish.name);
      setRows(
        initialDish.ingredients.map((ing, i) => ({
          id: i + 1,
          name: ing.name,
          quantity: ing.quantity.toString(),
          suggestion: undefined,
        }))
      );
    } else {
      setDishName('');
      setRows([{ id: 1, name: '', quantity: '' }]);
    }
  }, [initialDish, open]);

  const addRow = () => {
    const last = rows.at(-1)!;
    if (!last.name.trim() || last.quantity === '') return;
    setRows([...rows, { id: Date.now(), name: '', quantity: '' }]);
  };

  const removeRow = (id: number) => {
    setRows(rows.filter((r) => r.id !== id));
    setSuggestions((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const changeRow = (
    id: number,
    field: 'name' | 'quantity',
    value: string
  ) =>
    setRows((rows) =>
      rows.map((r) =>
        r.id === id
          ? {
              ...r,
              [field]: value,
              suggestion: field === 'name' ? undefined : r.suggestion,
            }
          : r
      )
    );

  async function handleSearch(id: number, text: string) {
    changeRow(id, 'name', text);

    if (text.trim().length < 2) {
      setSuggestions((prev) => ({ ...prev, [id]: [] }));
      return;
    }

    const token = getToken();
    if (!token) return;

    try {
      const list = await searchSupplierProducts(text, token);
      setSuggestions((prev) => ({ ...prev, [id]: list }));
    } catch {
      setSuggestions((prev) => ({ ...prev, [id]: [] }));
    }
  }

  function pickSuggestion(rowId: number, s: ProductSuggestion) {
    setRows((rows) =>
      rows.map((r) =>
        r.id === rowId ? { ...r, name: s.nombre, suggestion: s } : r
      )
    );
    setSuggestions((prev) => ({ ...prev, [rowId]: [] }));
  }

  const handleSave = () => {
    if (!dishName.trim()) return;

    const ingredients = rows
      .filter((r) => r.name.trim() && r.quantity !== '')
      .map((r) => {
        if (r.suggestion) {
          return {
            supplierProductId: r.suggestion.id,
            cantidad: Number(r.quantity),
            unidad: r.suggestion.unidad,
          };
        }
        return {
          nombreLibre: r.name.trim(),
          cantidad: Number(r.quantity),
          unidad: 'g',
        };
      });

    if (!ingredients.length) return;

    onSave({
      name: dishName.trim(),
      ingredients: ingredients.map((i) => ({
        name:
          'nombreLibre' in i
            ? i.nombreLibre!
            : rows.find((r) => r.suggestion?.id === i.supplierProductId)!.name,
        quantity: i.cantidad,
      })),
    });

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
            <div key={row.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
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
                  onChange={(e) => handleSearch(row.id, e.target.value)}
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

              {suggestions[row.id] ? (
                suggestions[row.id].length ? (
                  <div className="border rounded-md max-h-40 overflow-auto bg-white shadow text-sm">
                    {suggestions[row.id].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => pickSuggestion(row.id, s)}
                        className="w-full text-left px-3 py-1 hover:bg-[#F5FAF2]"
                      >
                        {s.nombre} — {s.proveedor} (${s.precio}/{s.unidad})
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 pl-7">
                    Sin resultados…
                  </div>
                )
              ) : null}
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