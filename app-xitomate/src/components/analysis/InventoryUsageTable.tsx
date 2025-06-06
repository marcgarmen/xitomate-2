// src/components/analysis/InventoryUsageTable.tsx
'use client';
import { useEffect, useState } from 'react';
import Etiqueta from '@/components/Test-Rosa/Etiqueta';
import { getToken } from '@/service/auth';
import { fetchInventoryForecast, type InventoryForecast } from '@/service/analysis';

export default function InventoryUsageTable() {
  const [data, setData] = useState<InventoryForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    fetchInventoryForecast(token)
      .then(setData)
      .catch(() => setError('No se pudo cargar el forecast de inventario'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Cargando inventario...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!data || !Array.isArray(data.inventory) || data.inventory.length === 0) {
    return <div>No hay inventario registrado.</div>;
  }

  // Asegurarnos de que forecastArr sea siempre un arreglo (aunque venga como string JSON)
  let forecastArr: { ingredient: string; forecast: number }[] = [];
  if (typeof data.forecast === 'string') {
    try {
      const parsed = JSON.parse(data.forecast);
      if (Array.isArray(parsed)) {
        forecastArr = parsed;
      } else {
        forecastArr = [];
      }
    } catch {
      forecastArr = [];
    }
  } else if (Array.isArray(data.forecast)) {
    forecastArr = data.forecast;
  } else {
    forecastArr = [];
  }

  const rows = data.inventory.map((inv) => {
    // Solo llamar a `.find` si forecastArr es un arreglo
    let forecastQty = 0;
    if (Array.isArray(forecastArr)) {
      const forecastItem = forecastArr.find((f) => f.ingredient === inv.ingredient);
      forecastQty = forecastItem ? forecastItem.forecast : 0;
    }
    const diff = inv.stock - forecastQty;
    const state = diff < 0 ? 'Faltante' : 'Sobrante';
    const color = diff < 0 ? 'error' as const : 'success' as const;
    return {
      ...inv,
      forecast: forecastQty,
      diff,
      state,
      color,
    };
  });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Inventario actual vs uso estimado
      </h2>
      <table className="w-full rounded-lg overflow-hidden text-left">
        <thead className="bg-[#9BB968] text-black">
          <tr>
            <th className="p-3">Insumo</th>
            <th className="p-3">En inventario</th>
            <th className="p-3">Se estima usar</th>
            <th className="p-3">Diferencia</th>
            <th className="p-3">Estado</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((it, idx) => (
            <tr
              key={it.ingredient + '-' + it.unit + '-' + idx}
              className={idx % 2 ? 'bg-[#EDF6E7]' : 'bg-[#F5FAF2]'}
            >
              <td className="p-3">{it.ingredient}</td>
              <td className="p-3">{it.stock} {it.unit}</td>
              <td className="p-3">{it.forecast} {it.unit}</td>
              <td className="p-3">
                {it.diff > 0 ? '+' : ''}
                {it.diff} {it.unit}
              </td>
              <td className="p-3">
                <Etiqueta text={it.state} color={it.color} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}