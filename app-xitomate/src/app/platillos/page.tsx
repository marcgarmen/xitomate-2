'use client';

import { useState } from 'react';
import { Button } from '@/components/Button/Button';
import DishTable from '@/components/Platillos/DishTable';
import AddDishModal, { Dish } from '@/components/Platillos/AddDishModal';

export default function PlatillosPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  /* ---- handlers ---- */
  const handleSave = (dish: Dish) => {
    if (editingIdx !== null) {
      setDishes((prev) => prev.map((d, i) => (i === editingIdx ? dish : d)));
    } else {
      setDishes((prev) => [...prev, dish]);
    }
    setModalOpen(false);
    setEditingIdx(null);
  };

  const handleEdit = (idx: number) => {
    setEditingIdx(idx);
    setModalOpen(true);
  };

  const handleDelete = (idx: number) => setDishes((prev) => prev.filter((_, i) => i !== idx));

  /* ---- render ---- */
  return (
    <main className="min-h-screen bg-[#FAF5F0]">
      <section className="max-w-5xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-8">Registra tus platillos</h1>

        <DishTable dishes={dishes} onEdit={handleEdit} onDelete={handleDelete} />

        <div className="mt-8">
          <Button variant="SignupGreen" onClick={() => setModalOpen(true)}>
            Nuevo platillo
          </Button>
        </div>
      </section>

      {modalOpen && (
        <AddDishModal
          onSave={handleSave}
          onCancel={() => {
            setModalOpen(false);
            setEditingIdx(null);
          }}
          initialDish={editingIdx !== null ? dishes[editingIdx] : undefined}
        />
      )}
    </main>
  );
}