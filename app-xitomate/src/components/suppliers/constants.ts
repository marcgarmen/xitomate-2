export const SUPPLIERS = [
  {
    id: 'sup-001',
    name: 'Huerto Verde',
    coverage: 'CDMX, Edo. Méx.',
    avatar: '/proveedor-icon.svg',
    topProducts: ['Lechuga orgánica', 'Tomate heirloom'],
  },
  {
    id: 'sup-002',
    name: 'Rancho Los Pinos',
    coverage: 'Querétaro, Hidalgo',
    avatar: '/proveedor-icon.svg',
    topProducts: ['Queso de cabra', 'Miel artesanal'],
  },
]

type Product = {
  id: string
  name: string
  unit: string
  price: number
  stock: number
  organic: boolean
  updatedAt: string
}

export const PRODUCTS: Record<string, Product[]> = {
  'sup-001': [
    {
      id: 'p-01',
      name: 'Lechuga romana',
      unit: 'pieza',
      price: 18,
      stock: 32,
      organic: true,
      updatedAt: '2025-05-15',
    },
    {
      id: 'p-02',
      name: 'Tomate cherry',
      unit: 'kg',
      price: 45,
      stock: 6,
      organic: true,
      updatedAt: '2025-05-18',
    },
  ],
  'sup-002': [
    {
      id: 'p-03',
      name: 'Queso cabra fresco',
      unit: 'kg',
      price: 120,
      stock: 12,
      organic: false,
      updatedAt: '2025-05-19',
    },
    {
      id: 'p-04',
      name: 'Miel de abeja',
      unit: 'kg',
      price: 90,
      stock: 25,
      organic: true,
      updatedAt: '2025-05-20',
    },
  ],
}