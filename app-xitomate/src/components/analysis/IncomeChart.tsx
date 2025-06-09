import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { DailyIncome } from '@/service/analysis';

interface Props {
  data: DailyIncome[];
}

export default function IncomeChart({ data }: Props) {
  if (!data || !data.length) return null;

  return (
    <div className="bg-[#F4F6F8] rounded-xl p-6 w-full h-[300px]">
      <h3 className="text-lg font-bold mb-2">Ingresos últimos 7 días</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <XAxis dataKey="date" tickFormatter={d => d.slice(5)} />
          <YAxis allowDecimals={false} />
          <Tooltip formatter={v => `$${v} MXN`} />
          <Bar dataKey="income" fill="#9BB968" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 