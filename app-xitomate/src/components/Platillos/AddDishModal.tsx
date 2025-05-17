'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/Button/Button';
import { Minus, Plus } from 'lucide-react';

type Ingredient = { id: number; name: string; quantity: number | '' };
export type Dish = { name: string; ingredients: { name: string; quantity: number }[] };

interface Props {
  /** Se envía cuando CREAS o ACTUALIZAS */
  onSave: (dish: Dish) => void;
  /** Cierra el modal sin guardar */
  onCancel: () => void;
  /** Si lo pasas, el modal se abre en modo edición */
  initialDish?: Dish;
}

export default function AddDishModal({ onSave, onCancel, initialDish }: Props) {
  const [dishName, setDishName] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: 1, name: '', quantity: '' },
  ]);

  /* ----   precarga al editar   ---- */
  useEffect(() => {
    if (initialDish) {
      setDishName(initialDish.name);
      setIngredients(
        initialDish.ingredients.map((ing, idx) => ({
          id: idx + 1,
          name: ing.name,
          quantity: ing.quantity,
        }))
      );
    }
  }, [initialDish]);

  /* ----   helpers   ---- */
  const addRow = () => {
    const last = ingredients.at(-1)!;
    if (!last.name || last.quantity === '') return;
    setIngredients((prev) => [...prev, { id: Date.now(), name: '', quantity: '' }]);
  };

  const removeRow = (id: number) => setIngredients((prev) => prev.filter((r) => r.id !== id));

  const change = (id: number, field: 'name' | 'quantity', value: string) => {
    setIngredients((prev) =>
      prev.map((ing) => (ing.id === id ? { ...ing, [field]: field === 'quantity' ? Number(value) : value } : ing))
    );
  };

  const handleSave = () => {
    if (!dishName.trim()) return;
    const valid = ingredients.filter((i) => i.name && i.quantity !== '') as Dish['ingredients'];
    if (!valid.length) return;
    onSave({ name: dishName.trim(), ingredients: valid });
  };

  /* ----   UI   ---- */
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
              <button className="size-6 flex items-center justify-center rounded-full bg-[#F45E62] text-white"
                      onClick={() => removeRow(ing.id)}>
                <Minus size={14} />
              </button>
            )}

            {idx === ingredients.length - 1 && (
              <button className="size-6 flex items-center justify-center rounded-full bg-[#A1C374] text-black"
                      onClick={addRow}>
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
          <Button variant="OutlineGreen" onClick={handleSave}>
            {initialDish ? 'Guardar' : 'Agregar'}
          </Button>
          <Button variant="SignUpRed" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}