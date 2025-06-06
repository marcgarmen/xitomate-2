import { getToken } from "@/service/auth";

export type IngredientResponse = {
  supplierProductId?: number;
  nombreLibre?: string;
  cantidad: number;
  unidad: string;
};

export type DishResponse = {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  ingredientes: IngredientResponse[] | null;
};

export async function fetchDishes(): Promise<DishResponse[] | null> {
  const token = getToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurant/dishes`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  return res.json();
}

export async function createDishRequest(payload: {
  nombre: string;
  precio: number;
  categoria: string;
  ingredientes: Array<{
    supplierProductId?: number;
    nombreLibre?: string;
    cantidad: number;
    unidad: string;
  }>;
}): Promise<DishResponse> {
  const token = getToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurant/dishes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt);
  }
  return res.json();
}

export async function updateDishRequest(
  id: number,
  payload: {
    nombre: string;
    precio: number;
    categoria: string;
    ingredientes: Array<{
      supplierProductId?: number;
      nombreLibre?: string;
      cantidad: number;
      unidad: string;
    }>;
  }
): Promise<DishResponse> {
  const token = getToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurant/dishes/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt);
  }
  return res.json();
}

export async function deleteDishRequest(id: number): Promise<void> {
  const token = getToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurant/dishes/${id}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  return;
}