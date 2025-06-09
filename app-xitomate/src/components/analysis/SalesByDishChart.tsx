'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getToken } from '@/service/auth';
import { fetchTopDishes, type DishSales } from '@/service/analysis';

export default function SalesByDishChart() {
  const [data, setData] = useState<DishSales[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    fetchTopDishes(token)
      .then((res) => setData(res))
      .catch(() => setError('No se pudo cargar ventas por platillo'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando ventas...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!data.length) return <div>No hay ventas registradas.</div>;

  return (
    <div className="bg-[#F4F6F8] rounded-xl p-6 w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="nombre" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#9BB968" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}