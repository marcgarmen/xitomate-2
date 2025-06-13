'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { getToken } from '@/service/auth'
import { fetchTopDishes, type DishSales } from '@/service/analysis'

export default function SalesByDishChart() {
  const [data, setData] = useState<DishSales[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = getToken()
    if (!token) return
    fetchTopDishes(token)
      .then((res) => setData(res))
      .catch(() => setError('No se pudo cargar ventas por platillo'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Cargando ventas...</div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!data.length) return <div>No hay ventas registradas.</div>

  return (
    <div className="bg-white rounded-xl p-6 shadow border border-gray-100 w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="nombre" />
          <YAxis allowDecimals={false} />
          <Tooltip
            wrapperStyle={{ outline: 'none' }}
            formatter={(value: number) => [`${value}`, 'Cantidad']}
          />
          <Bar dataKey="cantidad" fill="#7BC47F" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}