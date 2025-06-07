// src/components/analysis/InventoryUsageTable.tsx
'use client';
import { useEffect, useState } from 'react';
import { getToken } from '@/service/auth';

export default function InventoryUsageTable() {
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/analysis/sales-forecast`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setForecast(data.forecast || []))
      .catch(() => setError('No se pudo cargar el forecast de ventas'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Cargando predicción de ventas...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!forecast.length) {
    return <div>No hay forecast de ventas.</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Predicción de ventas (próximos 7 días)</h2>
      <table className="w-full rounded-lg overflow-hidden text-left">
        <thead className="bg-[#9BB968] text-black">
          <tr>
            <th className="p-3">Fecha</th>
            <th className="p-3">Ventas estimadas</th>
          </tr>
        </thead>
        <tbody>
          {forecast.map((f, idx) => (
            <tr key={f.ds + '-' + idx} className={idx % 2 ? 'bg-[#EDF6E7]' : 'bg-[#F5FAF2]'}>
              <td className="p-3">{f.ds.slice(0, 10)}</td>
              <td className="p-3">${f.yhat.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}