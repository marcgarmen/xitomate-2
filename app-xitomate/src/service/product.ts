import axios from "axios";
import type { Product } from "@/components/Productos/types";

const baseUrl = "/api/productos";

export async function fetchProducts(): Promise<Product[] | null> {
  const resp = await axios.get<Product[]>(baseUrl);
  return resp.data || null;
}

export async function createProductRequest(payload: Omit<Product, "id">) {
  await axios.post(baseUrl, payload);
}

export async function updateProductRequest(
  id: number,
  payload: Omit<Product, "id">
) {
  await axios.put(`${baseUrl}/${id}`, payload);
}

export async function deleteProductRequest(id: number) {
  await axios.delete(`${baseUrl}/${id}`);
}