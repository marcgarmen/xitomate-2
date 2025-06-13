'use client'

import { useEffect, useState } from 'react'
import { getToken } from '@/service/auth'
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
} from '@/service/analysis'
import IncomeChart from './IncomeChart'
import {
  Trophy,
  BarChart2,
  TrendingUp,
  AlertTriangle,
  Package as PackageIcon,
  Truck,
} from 'lucide-react'

export default function DashboardCards() {
  const [tab, setTab] = useState<'diario' | 'total'>('diario')
  const [data, setData] = useState<{
    topDishes: DishSales[]
    ingredientUsage: { mostUsed: IngredientUsage[]; leastUsed: IngredientUsage[] }
    dailyIncome: DailyIncome[]
    lowStock: LowStock[]
    topSupplier: TopSupplier
  } | null>(null)

  useEffect(() => {
    const token = getToken()
    if (!token) return
    Promise.all([
      fetchTopDishes(token),
      fetchIngredientUsage(token),
      fetchDailyIncome(token),
      fetchLowStock(token),
      fetchTopSupplier(token),
    ])
      .then(
        ([
          topDishes,
          ingredientUsage,
          dailyIncome,
          lowStock,
          topSupplier,
        ]) => {
          setData({
            topDishes,
            ingredientUsage,
            dailyIncome,
            lowStock,
            topSupplier,
          })
        },
      )
      .catch(console.error)
  }, [])

  if (!data) return <div>Cargando...</div>

  const topDishes = data.topDishes.slice(0, 3).map((d) => d.nombre).join(', ')
  const mostUsedIns = data.ingredientUsage.mostUsed
    .slice(0, 3)
    .map((i) => i.nombre)
    .join(', ')
  const leastUsed = data.ingredientUsage.leastUsed
    .slice(0, 2)
    .map((i) => i.nombre)
    .join(', ')
  const lowStock = data.lowStock.map((i) => i.nombre).join(', ')

  const today = new Date().toISOString().slice(0, 10)
  let todayIncome =
    data.dailyIncome.find((d) => d.date === today)?.income ?? null
  let lastIncomeDate = today
  if (todayIncome === null || todayIncome === 0) {
    const lastWithIncome = [...data.dailyIncome]
      .reverse()
      .find((d) => d.income && d.income > 0)
    if (lastWithIncome) {
      todayIncome = lastWithIncome.income
      lastIncomeDate = lastWithIncome.date
    } else {
      todayIncome = 0
    }
  }
  const totalIncome = data.dailyIncome.reduce(
    (acc, d) => acc + (d.income || 0),
    0,
  )

  const cards = [
    { title: 'Top 3 platillos más vendidos', value: topDishes || 'Sin datos' },
    { title: 'Insumos más usados', value: mostUsedIns || 'Sin datos' },
    { title: 'Insumos menos usados', value: leastUsed || 'Sin datos' },
    {
      title:
        tab === 'diario' ? `Ingreso (${lastIncomeDate})` : 'Ingreso total',
      value:
        tab === 'diario'
          ? `$${todayIncome} MXN`
          : `$${totalIncome} MXN`,
    },
    { title: 'Productos con bajo stock', value: lowStock || 'Sin datos' },
    { title: 'Proveedor más usado', value: data.topSupplier.topSupplier },
  ]

  const icons = [
    Trophy,
    BarChart2,
    BarChart2,
    TrendingUp,
    AlertTriangle,
    Truck,
  ]

  return (
    <>
      <div className="flex gap-4 mb-6">
        <button
          className={`px-6 py-3 rounded-full text-base font-bold cursor-pointer transition ${
            tab === 'diario'
              ? 'bg-[#5EBD6C] text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setTab('diario')}
        >
          Ingreso diario
        </button>
        <button
          className={`px-6 py-3 rounded-full text-base font-bold cursor-pointer transition ${
            tab === 'total'
              ? 'bg-[#5EBD6C] text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setTab('total')}
        >
          Ingreso total
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, idx) => {
          const Icon = icons[idx]
          return (
            <div
              key={c.title}
              className="bg-white rounded-xl p-4 shadow border border-gray-100 flex items-center gap-4"
            >
              <span className="w-11 h-11 flex items-center justify-center rounded-full bg-[#FCE8EC] text-[#E11D48] shrink-0">
                <Icon className="size-5" strokeWidth={2.2} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-gray-600">
                  {c.title}
                </h3>
                <p className="text-lg font-bold text-gray-900 break-words">
                  {c.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8">
        <IncomeChart data={data.dailyIncome} />
      </div>
    </>
  )
}