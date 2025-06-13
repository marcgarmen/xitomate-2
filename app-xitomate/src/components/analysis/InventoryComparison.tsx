import Etiqueta from '@/components/Test-Rosa/Etiqueta'

const data = [
  { name: 'Jitomate', inv: '10 kg', use: '12 kg', diff: '-2 kg', status: 'Faltante' },
  { name: 'Cebolla', inv: '8 kg', use: '5 kg', diff: '+3 kg', status: 'Sobrante' },
]

export default function InventoryComparison() {
  return (
    <section className="bg-white rounded-xl shadow border border-gray-100 p-6">
      <h2 className="text-xl font-bold mb-4">Inventario vs uso estimado</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-[#5EBD6C] text-black">
            <tr>
              <th className="p-3">Insumo</th>
              <th className="p-3">En inventario</th>
              <th className="p-3">Estimado uso</th>
              <th className="p-3">Diferencia</th>
              <th className="p-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.name}
                className="odd:bg-white even:bg-[#F5FAF2] hover:bg-[#E6F7EB] transition-colors"
              >
                <td className="p-3 font-medium">{row.name}</td>
                <td className="p-3">{row.inv}</td>
                <td className="p-3">{row.use}</td>
                <td className="p-3">{row.diff}</td>
                <td className="p-3">
                  <Etiqueta
                    text={row.status}
                    color={row.status === 'Faltante' ? 'error' : 'success'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right">
        <button className="text-[#5EBD6C] font-semibold hover:underline">
          Ver recomendación de compra
        </button>
      </div>
    </section>
)
}