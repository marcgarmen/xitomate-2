'use client'

import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export default function PrediccionGrafica() {
  const [forecast, setForecast] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/restaurant/analysis/sales-forecast`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        const data = await res.json()
        setForecast(data.forecast || [])
      } catch {
        setError('Error al cargar el pronóstico')
      }
    }
    fetchForecast()
  }, [])

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>
  }

  const labels = forecast.map((f) => f.date.slice(5))
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Ventas Pronosticadas',
        data: forecast.map((f) => f.forecast),
        borderColor: '#5EBD6C',
        backgroundColor: 'rgba(94, 189, 108, 0.2)',
        tension: 0.2,
      },
      {
        label: 'Ventas Reales',
        data: forecast.map((f) => f.actual),
        borderColor: '#E11D48',
        backgroundColor: 'rgba(225, 29, 72, 0.2)',
        tension: 0.2,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Pronóstico vs Real' },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    interaction: { mode: 'nearest' as const, axis: 'x' as const, intersect: false },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#ECECEC' } },
    },
  }

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
      <Line data={chartData} options={options} height={200} />
    </div>
)
}