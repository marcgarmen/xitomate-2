"use client";

import { useState } from "react";
import { Button } from "@/components/Button/Button";
import DishTable from "@/components/Platillos/DishTable";
import AddDishModal from "@/components/Platillos/AddDishModal";
import type { Dish } from "@/components/Platillos/types";
import ProtectedRestaurant from "@/components/ProtectedRestaurant";

export default function PlatillosPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

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

  const handleDelete = (idx: number) =>
    setDishes((prev) => prev.filter((_, i) => i !== idx));

  return (
    <ProtectedRestaurant>
      <main className="bg-[#FAF5F0] min-h-screen">
        <div className="container mx-auto max-w-5xl py-10">
          <div className="flex gap-4 mb-8">
            <Button variant="SignupGreen" onClick={() => setModalOpen(true)}>
              Nuevo platillo
            </Button>
          </div>

          <h2 className="text-2xl font-bold mb-4">Tus platillos</h2>

          <DishTable
            dishes={dishes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <AddDishModal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setEditingIdx(null);
            }}
            onSave={handleSave}
            initialDish={editingIdx !== null ? dishes[editingIdx] : undefined}
          />
        </div>
      </main>
    </ProtectedRestaurant>
  );
}