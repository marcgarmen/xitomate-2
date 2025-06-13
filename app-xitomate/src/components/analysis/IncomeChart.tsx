'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { DailyIncome } from '@/service/analysis'

interface Props {
  data: DailyIncome[]
}

export default function IncomeChart({ data }: Props) {
  if (!data || !data.length) return null

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 p-6 w-full h-[350px]">
      <h3 className="text-lg font-bold mb-4">Ingresos últimos 7 días</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} />
          <YAxis allowDecimals={false} />
          <Tooltip formatter={(v) => `$${v} MXN`} />
          <Bar dataKey="income" fill="#5EBD6C" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
)
}