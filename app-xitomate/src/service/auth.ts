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
// 2.  Helpers
//--------------------------------------------------

const TOKEN_KEY = 'xitomate_token'; // clave única

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
// 3.  Proveedores
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
// 4.  Catálogo de un proveedor
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
// 5.  Sugerencias de ingredientes / productos
//--------------------------------------------------

export type ProductSuggestion = {
  id: number;          // supplierProductId
  nombre: string;
  proveedor: string;
  precio: number;
  unidad: string;
};

// GET /supplierProducts/search?query=tomate
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