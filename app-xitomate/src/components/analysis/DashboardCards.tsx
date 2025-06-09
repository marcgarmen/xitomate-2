'use client';
import { useEffect, useState } from 'react';
import { getToken } from '@/service/auth';
import {
  fetchTopDishes,
  fetchIngredientUsage,
  fetchDailyIncome,
  fetchLowStock,
  fetchTopSupplier,
  type DishSales,
  type IngredientUsage,
  type DailyIncome,
  type LowStock,
  type TopSupplier,
} from '@/service/analysis';
import IncomeChart from './IncomeChart';

export default function DashboardCards() {
  const [tab, setTab] = useState<'diario' | 'total'>('diario');
  const [data, setData] = useState<{
    topDishes: DishSales[]
    ingredientUsage: { mostUsed: IngredientUsage[], leastUsed: IngredientUsage[] }
    dailyIncome: DailyIncome[]
    lowStock: LowStock[]
    topSupplier: TopSupplier
  } | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    Promise.all([
      fetchTopDishes(token),
      fetchIngredientUsage(token),
      fetchDailyIncome(token),
      fetchLowStock(token),
      fetchTopSupplier(token),
    ]).then(([topDishes, ingredientUsage, dailyIncome, lowStock, topSupplier]) => {
      setData({
        topDishes,
        ingredientUsage,
        dailyIncome,
        lowStock,
        topSupplier,
      });
    }).catch(console.error);
  }, []);

  if (!data) return <div>Cargando...</div>;

  const topDishes = data.topDishes.slice(0, 3).map(d => d.nombre).join(', ');
  const mostUsedIns = data.ingredientUsage.mostUsed.slice(0, 3).map(i => i.nombre).join(', ');
  const leastUsed = data.ingredientUsage.leastUsed.slice(0, 2).map(i => i.nombre).join(', ');
  const lowStock = data.lowStock.map(i => i.nombre).join(', ');

  // Obtener el ingreso de hoy
  const today = new Date().toISOString().slice(0, 10);
  let todayIncome = data.dailyIncome.find(d => d.date === today)?.income ?? null;
  let lastIncomeDate = today;
  if (todayIncome === null || todayIncome === 0) {
    // Buscar el último día con ventas (de mayor a menor)
    const lastWithIncome = [...data.dailyIncome].reverse().find(d => d.income && d.income > 0);
    if (lastWithIncome) {
      todayIncome = lastWithIncome.income;
      lastIncomeDate = lastWithIncome.date;
    } else {
      todayIncome = 0;
      lastIncomeDate = today;
    }
  }
  // Calcular ingreso total últimos 7 días
  const totalIncome = data.dailyIncome.reduce((acc, d) => acc + (d.income || 0), 0);

  const cards = [
    { title: 'Top 3 platillos más vendidos', value: topDishes || 'Sin datos' },
    { title: 'Insumos más usados', value: mostUsedIns || 'Sin datos' },
    { title: 'Insumos menos usados', value: leastUsed || 'Sin datos' },
    { title: tab === 'diario' ? `Ingreso (${lastIncomeDate})` : 'Ingreso total', value: tab === 'diario' ? `$${todayIncome} MXN` : `$${totalIncome} MXN` },
    { title: 'Productos con bajo stock', value: lowStock || 'Sin datos' },
    { title: 'Proveedor más usado', value: data.topSupplier.topSupplier },
  ];

  return (
    <>
      <div className="flex gap-2 mb-2">
        <button className={`px-3 py-1 rounded ${tab === 'diario' ? 'bg-[#9BB968] text-white' : 'bg-gray-200'}`} onClick={() => setTab('diario')}>Ingreso diario</button>
        <button className={`px-3 py-1 rounded ${tab === 'total' ? 'bg-[#9BB968] text-white' : 'bg-gray-200'}`} onClick={() => setTab('total')}>Ingreso total</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(c => (
          <div key={c.title} className="bg-white rounded-xl p-4 shadow-sm border">
            <h3 className="text-sm font-semibold text-gray-600 mb-1">{c.title}</h3>
            <p className="text-lg font-bold text-gray-900">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <IncomeChart data={data.dailyIncome} />
      </div>
    </>
  );
}