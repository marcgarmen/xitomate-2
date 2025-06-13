import { AlertTriangle } from 'lucide-react'

const alerts = [
  'El consumo de queso panela aumentó un 30%. ¿Actualizar predicción?',
  "No hay proveedor disponible para 'chile habanero'. ¿Buscar alternativas?",
]

export default function AlertList() {
  return (
    <section className="bg-white rounded-xl shadow border border-gray-100 p-6">
      <h2 className="text-xl font-bold mb-4">Alertas y sugerencias</h2>
      <ul className="space-y-3">
        {alerts.map((msg, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#FDF1F3] transition"
          >
            <span className="mt-1 text-[#E11D48]">
              <AlertTriangle className="size-5" />
            </span>
            <p className="text-gray-800">{msg}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-4">
        <button className="text-[#5EBD6C] font-semibold hover:underline">
          Actualizar datos
        </button>
        <button className="text-[#5EBD6C] font-semibold hover:underline">
          Ir al inventario
        </button>
        <button className="text-[#5EBD6C] font-semibold hover:underline">
          Ver historial de ventas
        </button>
      </div>
    </section>
)
}