"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/Button/Button";
import { DishTable, AddDishModal } from "@/components/Platillos";
import type { Dish } from "@/components/Platillos/types";
import ProtectedRestaurant from "@/components/ProtectedRestaurant";
import {
  fetchDishes,
  createDishRequest,
  updateDishRequest,
  deleteDishRequest,
} from "@/service/dish";
import { useToast } from "@/components/toast/ToastProvider";

export default function PlatillosPage() {
  const toast = useToast();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);

  useEffect(() => {
    loadDishes();
  }, []);

  async function loadDishes() {
    try {
      const listResp = await fetchDishes();
      if (!listResp) {
        setDishes([]);
        return;
      }
      const mapped = listResp.map((r) => ({
        id: r.id,
        nombre: r.nombre,
        precio: r.precio,
        categoria: r.categoria,
        ingredientes: (r.ingredientes ?? []).map((i) => ({
          supplierProductId: i.supplierProductId,
          nombreLibre: i.nombreLibre,
          cantidad: i.cantidad,
          unidad:
            i.unidad === "kg" || i.unidad === "piezas" || i.unidad === "otro"
              ? i.unidad
              : "otro",
        })),
      }));
      mapped.sort((a, b) => b.id - a.id);
      setDishes(mapped as Dish[]);
    } catch (e) {
      console.error("Error al cargar platillos:", e);
      setDishes([]);
    }
  }

  async function handleSave(dish: Dish) {
    try {
      const payload = {
        nombre: dish.nombre,
        precio: dish.precio,
        categoria: dish.categoria,
        ingredientes: dish.ingredientes.map((ing) => ({
          supplierProductId: ing.supplierProductId,
          nombreLibre: ing.nombreLibre,
          cantidad: ing.cantidad,
          unidad: ing.unidad,
        })),
      };
      if (dish.id) {
        await updateDishRequest(dish.id, payload);
        toast("success", "Platillo actualizado correctamente");
      } else {
        await createDishRequest(payload);
        toast("success", "Platillo agregado correctamente");
      }
      setModalOpen(false);
      setEditingDish(null);
      await loadDishes();
    } catch (e) {
      console.error("Falló guardar platillo:", e);
      toast("error", "Error al guardar el platillo, inténtalo de nuevo");
    }
  }

  function handleEdit(d: Dish) {
    setEditingDish(d);
    setModalOpen(true);
  }

  async function handleDelete(id: number) {
    try {
      await deleteDishRequest(id);
      await loadDishes();
    } catch (e) {
      console.error("Falló eliminar platillo:", e);
      toast("error", "Error al eliminar el platillo");
    }
  }

  return (
    <ProtectedRestaurant>
      <main className="bg-[#FAF5F0] min-h-screen">
        <div className="container mx-auto max-w-5xl py-10">
          <h1 className="text-3xl font-bold mb-2">Registra tus platillos</h1>
          <p className="text-gray-700 mb-6">
            Agrega, edita o elimina los platillos de tu restaurante.
          </p>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Tus platillos</h2>
            <Button variant="SignupGreen" onClick={() => setModalOpen(true)}>
              Nuevo platillo
            </Button>
          </div>
          <DishTable dishes={dishes} onEdit={handleEdit} onDelete={handleDelete} />
          <AddDishModal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setEditingDish(null);
            }}
            onSave={handleSave}
            initialDish={editingDish ?? undefined}
          />
        </div>
      </main>
    </ProtectedRestaurant>
  );
}