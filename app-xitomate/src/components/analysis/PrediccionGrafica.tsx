'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Lunes', Verduras: 12, Cárnicos: 6 },
  { name: 'Martes', Verduras: 9, Cárnicos: 8 },
  { name: 'Miércoles', Verduras: 10, Cárnicos: 7 },
  { name: 'Jueves', Verduras: 14, Cárnicos: 9 },
  { name: 'Viernes', Verduras: 11, Cárnicos: 10 },
  { name: 'Sábado', Verduras: 13, Cárnicos: 12 },
  { name: 'Domingo', Verduras: 8, Cárnicos: 7 },
];

export default function PrediccionGrafica() {
  return (
    <div className="bg-[#F4F6F8] rounded-xl p-6 w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Verduras" stackId="a" fill="#9BB968" />
          <Bar dataKey="Cárnicos" stackId="a" fill="#F45E62" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}