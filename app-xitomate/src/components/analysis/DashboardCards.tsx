'use client';
import {
  DISH_SALES,
  INGREDIENT_USAGE,
  DAILY_INCOME_PESOS,
  LOW_STOCK,
  MOST_USED_SUPPLIER,
} from './constants';

const topDishes   = DISH_SALES.slice(0, 3).map(d => d.name).join(', ');
const mostUsedIns = INGREDIENT_USAGE.slice(0, 3).map(i => i.name).join(', ');
const leastUsed   = INGREDIENT_USAGE.slice(-2).map(i => i.name).join(', ');
const lowStock    = LOW_STOCK.join(', ');

const cards = [
  { title: 'Top 3 platillos más vendidos', value: topDishes },
  { title: 'Insumos más usados',           value: mostUsedIns },
  { title: 'Insumos menos usados',         value: leastUsed },
  { title: 'Ingreso diario',    value: `$${DAILY_INCOME_PESOS} MXN` },
  { title: 'Productos con bajo stock',     value: lowStock },
  { title: 'Proveedor más usado',          value: MOST_USED_SUPPLIER },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map(c => (
        <div key={c.title} className="bg-white rounded-xl p-4 shadow-sm border">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">{c.title}</h3>
          <p className="text-lg font-bold text-gray-900">{c.value}</p>
        </div>
      ))}
    </div>
  );
}