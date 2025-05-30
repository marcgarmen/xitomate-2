export type Sale = {
  dish: string;
  quantity: number;
  unitPrice: number;
  date: string;
};

export type InventoryItem = {
  ingredient: string;
  stock: number;
  unit: string;
  updatedAt: string;
};