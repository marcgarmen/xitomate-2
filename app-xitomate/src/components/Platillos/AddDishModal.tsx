'use client';

import { useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import type { Dish } from './types';

type Row = { id: number; name: string; quantity: number | '' };

interface Props {
  onSave: (dish: Dish) => void;
  onCancel: () => void;
  initialDish?: Dish;
}

export default function AddDishModal({ onSave, onCancel, initialDish }: Props) {
  const [dishName, setDishName] = useState('');
  const [ingredients, setIngredients] = useState<Row[]>([
    { id: 1, name: '', quantity: '' },
  ]);

  useEffect(() => {
    if (initialDish) {
      setDishName(initialDish.name);
      setIngredients(
        initialDish.ingredients.map(
          (ing, idx): Row => ({
            id: idx + 1,
            name: ing.name,
            quantity: ing.quantity,
          })
        )
      );
    }
  }, [initialDish]);

  const addRow = () => {
    const last = ingredients.at(-1)!;
    if (!last.name || last.quantity === '') return;
    setIngredients((prev) => [
      ...prev,
      { id: Date.now(), name: '', quantity: '' },
    ]);
  };

  const removeRow = (id: number) =>
    setIngredients((prev) => prev.filter((r) => r.id !== id));

  const change = (id: number, field: 'name' | 'quantity', value: string) =>
    setIngredients((prev) =>
      prev.map((ing) =>
        ing.id === id
          ? {
              ...ing,
              [field]:
                field === 'quantity'
                  ? (value === '' ? '' : Number(value))
                  : value,
            }
          : ing
      )
    );

  const handleSave = async () => {
    if (!dishName.trim()) return;

    const valid = ingredients.filter(
      (r): r is Row & { quantity: number } =>
        r.name !== '' && r.quantity !== ''
    );
    if (!valid.length) return;

    const payload: Dish = {
      name: dishName.trim(),
      ingredients: valid.map(({ name, quantity }) => ({ name, quantity })),
    };

    const res = await fetch('/api/dishes', {
      method: initialDish ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return;

    onSave(await res.json());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {initialDish ? 'Editar platillo' : 'Nuevo platillo'}
        </h2>

        <input
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          placeholder="Nombre del platillo"
          className="w-full rounded-md p-2 mb-6 bg-[#A1C374] placeholder:text-black/60"
        />

        <h3 className="text-xl font-semibold mb-2">Ingredientes</h3>

        {ingredients.map((ing, idx) => (
          <div key={ing.id} className="flex items-center gap-2 mb-3">
            {idx !== 0 && (
              <button
                className="size-6 flex items-center justify-center rounded-full bg-[#F45E62] text-white"
                onClick={() => removeRow(ing.id)}
              >
                <Minus size={14} />
              </button>
            )}

            {idx === ingredients.length - 1 && (
              <button
                className="size-6 flex items-center justify-center rounded-full bg-[#A1C374] text-black"
                onClick={addRow}
              >
                <Plus size={14} />
              </button>
            )}

            <input
              className="flex-1 rounded-md p-2 bg-[#A1C374] placeholder:text-black/60"
              value={ing.name}
              onChange={(e) => change(ing.id, 'name', e.target.value)}
              placeholder="Ingrediente"
            />

            <input
              className="w-20 rounded-md p-2 bg-[#A1C374] text-center"
              type="number"
              min={0}
              value={ing.quantity}
              onChange={(e) => change(ing.id, 'quantity', e.target.value)}
            />
          </div>
        ))}

        <div className="mt-8 flex justify-center gap-4">
          <Button
            buttonType="OutlineGreen"
            variant="OutlineGreen"
            onClick={handleSave}
          >
            {initialDish ? 'Guardar' : 'Agregar'}
          </Button>
          <Button
            buttonType="SignUpRed"
            variant="SignUpRed"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}