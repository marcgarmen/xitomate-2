export interface Product {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  unidad: string;
}

export interface ProductFormData {
  nombre: string;
  precio: number;
  stock: number;
  unidad: string;
}