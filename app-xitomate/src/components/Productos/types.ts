export interface Product {
  id: number;
  name: string;
  price: number;
  unit: "kg" | "piezas" | "otro";
  stock: number;
}