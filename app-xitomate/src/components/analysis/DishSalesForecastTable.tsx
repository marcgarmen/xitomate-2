'use client'

import { useEffect, useState } from 'react'
import { getToken } from '@/service/auth'

export default function DishSalesForecastTable() {
  const [forecast, setForecast] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = getToken()
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurant/analysis/dish-sales-forecast`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then((res) => res.json())
      .then((data) => setForecast(data.forecast || []))
      .catch(() =>
        setError('No se pudo cargar el forecast de ventas por platillo'),
      )
  }, [])

  if (error) return <div className="text-red-600">{error}</div>
  if (!forecast.length) return <div>No hay forecast de ventas por platillo.</div>

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">
        Predicción de ventas por platillo (próximos 7 días)
      </h2>

      <div className="grid gap-6">
        {forecast.map((dish, idx) => (
          <div
            key={dish.dish + '-' + idx}
            className="bg-white rounded-xl shadow border border-gray-100 p-4"
          >
            <h3 className="font-semibold mb-2">{dish.dish}</h3>
            <div className="overflow-x-auto rounded-2xl">
              <table className="min-w-full text-left">
                <thead className="bg-[#7BC47F] text-black">
                  <tr>
                    <th className="p-4">Fecha</th>
                    <th className="p-4">Ventas estimadas</th>
                  </tr>
                </thead>
                <tbody>
                  {dish.forecast.map((f: any, i: number) => (
                    <tr
                      key={f.ds + '-' + i}
                      className={`${
                        i % 2 ? 'bg-white' : 'bg-[#F5FAF2]'
                      } hover:bg-[#E6F7EB] transition-colors`}
                    >
                      <td className="p-4">{f.ds.slice(0, 10)}</td>
                      <td className="p-4">{f.yhat.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}