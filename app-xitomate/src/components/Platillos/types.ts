export type Ingredient = {
  supplierProductId?: number;
  nombreLibre?: string;
  cantidad: number;
  unidad: "kg" | "piezas" | "otro";
};

export type Dish = {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  ingredientes: Ingredient[];
};