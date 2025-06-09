// src/components/analysis/constants.ts
// ------------------------------------

// Ventas simuladas por platillo (para gráfica y tarjetas)
export const DISH_SALES = [
  { name: 'Tacos',            qty: 120 }, // 120 órdenes
  { name: 'Quesadillas',      qty:  90 },
  { name: 'Huevos revueltos', qty:  70 },
];

// Uso acumulado de ingredientes esta semana
// (ordenados de más a menos para que slice(0,3) funcione)
export const INGREDIENT_USAGE = [
  { name: 'Tortilla', qty: 340 },
  { name: 'Carne',    qty: 260 },
  { name: 'Huevos',   qty: 140 },
  { name: 'Jitomate', qty:  70 },
  { name: 'Queso',    qty:  50 },
];

// Inventario actual (stock) y pronóstico de uso (forecast)
export const INVENTORY_FORECAST = [
  { name: 'Tortilla', stock: 300, forecast: 340 },
  { name: 'Jitomate', stock:   9, forecast:  70 },
  { name: 'Carne',    stock: 270, forecast: 260 },
  { name: 'Queso',    stock:   8, forecast:  50 },
  { name: 'Huevos',   stock:   9, forecast: 140 },
];

// Otros KPI simulados
export const DAILY_INCOME_PESOS = 2850;        // ← aquí estaba el faltante
export const LOW_STOCK          = ['Queso', 'Huevos']; // <10 kg
export const MOST_USED_SUPPLIER = 'Verduras MX';