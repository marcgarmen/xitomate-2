export interface Sale {
  id: number;
  dish: string;
  quantity: number;
  unitPrice: number;
  date: Date;
  metodoPago: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  stock: number;
  unit: string;
  updatedAt: Date;
}