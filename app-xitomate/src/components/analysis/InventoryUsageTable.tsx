'use client';
import { INVENTORY_FORECAST } from './constants';
import Etiqueta from '@/components/Test-Rosa/Etiqueta';

export default function InventoryUsageTable() {
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
          {INVENTORY_FORECAST.map((it, idx) => {
            const diff  = it.stock - it.forecast;
            const state = diff < 0 ? 'Faltante' : 'Sobrante';
            const color = diff < 0 ? 'error'    : 'success';
            return (
              <tr key={it.name} className={idx % 2 ? 'bg-[#EDF6E7]' : 'bg-[#F5FAF2]'}>
                <td className="p-3">{it.name}</td>
                <td className="p-3">{it.stock} kg</td>
                <td className="p-3">{it.forecast} kg</td>
                <td className="p-3">{diff > 0 ? '+' : ''}{diff} kg</td>
                <td className="p-3">
                  <Etiqueta text={state} color={color} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}