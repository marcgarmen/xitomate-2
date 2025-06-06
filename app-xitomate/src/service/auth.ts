// src/service/auth.ts
//--------------------------------------------------
// 1.  Auth (registro / login)
//--------------------------------------------------

export async function registerUser(data: {
  email: string;
  password: string;
  nombre: string;
  role: string;
  ubicacion: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function loginUser(email: string, password: string) {
  const url =
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login` +
    `?email=${encodeURIComponent(email)}` +
    `&password=${encodeURIComponent(password)}`;
  const res = await fetch(url, { method: 'POST' });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // → { token, role, email, userId }
}

//--------------------------------------------------
// 2.  Helpers (token en localStorage)
//--------------------------------------------------

const TOKEN_KEY = 'xitomate_token';

export function getToken() {
  if (typeof window === 'undefined') return '';
  return (
    localStorage.getItem(TOKEN_KEY) ??
    localStorage.getItem('token') ??
    ''
  );
}

export function saveToken(token: string) {
  if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, token);
}

export function logoutUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');
  }
}

//--------------------------------------------------
// 3.  Proveedores (no cambia)
//--------------------------------------------------

export type SupplierApi = {
  id: number;
  nombre: string | null;
  ubicacion: string | null;
};

export async function fetchSuppliers(): Promise<SupplierApi[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/suppliers`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('No se pudo obtener proveedores');
  return res.json();
}

//--------------------------------------------------
// 4.  Catálogo de un proveedor (no cambia)
//--------------------------------------------------

export type ProductApi = {
  id: number;
  nombre: string;
  unidad: string;
  precio: number;
  stock: number;
};

export async function fetchSupplierCatalog(
  supplierId: number,
  token: string
): Promise<ProductApi[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/suppliers/${supplierId}/catalog`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('No se pudo obtener catálogo');
  return res.json();
}

//--------------------------------------------------
// 5.  Sugerencias de ingredientes / productos (no cambia)
//--------------------------------------------------

export type ProductSuggestion = {
  id: number;
  nombre: string;
  proveedor: string;
  precio: number;
  unidad: string;
};

export async function searchSupplierProducts(
  query: string,
  token: string
): Promise<ProductSuggestion[]> {
  if (!query.trim()) return [];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/supplierProducts/search?query=${encodeURIComponent(
      query
    )}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    console.error('searchSupplierProducts →', res.status, await res.text());
    return [];
  }

  const data = await res.json();
  return (data as any[]).map((p) => ({
    id: p.id,
    nombre: p.nombre,
    proveedor: p.proveedor ?? p.supplier ?? 'Proveedor',
    precio: p.precio,
    unidad: p.unidad,
  }));
}

//--------------------------------------------------
// 6.  Ventas
//--------------------------------------------------

// Payload que el backend espera para crear una nueva venta
export interface CreateSaleRequest {
  metodoPago: string; // 'CASH' | 'COD' | 'CARD'
  items: {
    dishId: number;
    cantidad: number;
  }[];
}

// POST /restaurant/sales
export async function createSale(data: CreateSaleRequest): Promise<any> {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/sales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error('createSale →', res.status, text);
    throw new Error(text);
  }
  return res.json(); // → { id, metodoPago, items, fecha, total, … }
}

// GET /restaurant/sales → devuelve todas las ventas de ese restaurante
export async function fetchSales(): Promise<
  Array<{
    id: number;
    metodoPago: string;
    items: { dishId: number; cantidad: number }[];
    fecha: string;
    total: number;
  }>
> {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/sales`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.text();
    console.error('fetchSales →', res.status, err);
    throw new Error(err);
  }
  return res.json();
}

// DELETE /restaurant/sales/{id}
export async function deleteSaleRequest(id: number): Promise<void> {
  const token = getToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurant/sales/${id}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) {
    const err = await res.text();
    console.error('deleteSaleRequest →', res.status, err);
    throw new Error(err);
  }
}

// PUT /restaurant/sales/{id}
export async function updateSaleRequest(
  id: number,
  data: CreateSaleRequest
): Promise<any> {
  const token = getToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurant/sales/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    console.error('updateSaleRequest →', res.status, text);
    throw new Error(text);
  }
  return res.json();
}