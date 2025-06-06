import type { Pedido, OrderItem } from "@/components/Pedidos/types";

const samplePedidos: Pedido[] = [
  {
    id: 1,
    restaurantName: "Restaurante La Buena Mesa",
    items: [
      { productName: "Tomates", quantity: 3, unit: "kg", price: 40 },
      { productName: "Cebollas", quantity: 2, unit: "kg", price: 35 },
    ],
  },
  {
    id: 2,
    restaurantName: "Taquería El Buen Taco",
    items: [
      { productName: "Limones", quantity: 5, unit: "piezas", price: 5 },
    ],
  },
];

export async function fetchPedidos(): Promise<Pedido[]> {
  return Promise.resolve(
    samplePedidos.map((p) => ({ ...p, status: undefined }))
  );
}