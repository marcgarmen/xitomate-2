import { useEffect, useState } from 'react';
import { getToken } from '@/service/auth';

export default function DishSalesForecastTable() {
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/analysis/dish-sales-forecast`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setForecast(data.forecast || []))
      .catch(() => setError('No se pudo cargar el forecast de ventas por platillo'));
  }, []);

  if (error) return <div>{error}</div>;
  if (!forecast.length) return <div>No hay forecast de ventas por platillo.</div>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Predicción de ventas por platillo (próximos 7 días)</h2>
      {forecast.map((dish, idx) => (
        <div key={dish.dish + '-' + idx} className="mb-6">
          <h3 className="font-semibold mb-2">{dish.dish}</h3>
          <table className="w-full rounded-lg overflow-hidden text-left">
            <thead className="bg-[#9BB968] text-black">
              <tr>
                <th className="p-3">Fecha</th>
                <th className="p-3">Ventas estimadas</th>
              </tr>
            </thead>
            <tbody>
              {dish.forecast.map((f: any, i: number) => (
                <tr key={f.ds + '-' + i} className={i % 2 ? 'bg-[#EDF6E7]' : 'bg-[#F5FAF2]'}>
                  <td className="p-3">{f.ds.slice(0, 10)}</td>
                  <td className="p-3">{f.yhat.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}