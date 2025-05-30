import { AlertTriangle } from 'lucide-react';

const alerts = [
  'El consumo de queso panela aumentó un 30%. ¿Actualizar predicción?',
  "No hay proveedor disponible para 'chile habanero'. ¿Buscar alternativas?",
];

export default function AlertList() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Alertas y sugerencias</h2>
      <ul className="space-y-2">
        {alerts.map((msg, i) => (
          <li key={i} className="flex items-start gap-2">
            <AlertTriangle className="text-red-500 size-5 mt-1" />
            <span className="text-gray-800">{msg}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-4 flex-wrap">
        <button className="underline text-sm text-[#A1C374]">Actualizar datos</button>
        <button className="underline text-sm text-[#A1C374]">Ir al inventario</button>
        <button className="underline text-sm text-[#A1C374]">Ver historial de ventas</button>
      </div>
    </section>
  );
}