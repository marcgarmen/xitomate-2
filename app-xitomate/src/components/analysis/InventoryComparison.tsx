import Etiqueta from '@/components/Test-Rosa/Etiqueta';

const data = [
  { name: 'Jitomate', inv: '10 kg', use: '12 kg', diff: '-2 kg', status: 'Faltante' },
  { name: 'Cebolla', inv: '8 kg', use: '5 kg', diff: '+3 kg', status: 'Sobrante' },
];

export default function InventoryComparison() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Inventario actual vs uso estimado</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
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
            {data.map((row) => (
              <tr key={row.name} className="odd:bg-[#F5FAF2] even:bg-[#EDF6E7]">
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
      <div className="mt-4">
        <button className="underline text-sm text-[#A1C374]">
          Ver recomendación de compra
        </button>
      </div>
    </section>
  );
}