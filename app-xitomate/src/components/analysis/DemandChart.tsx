import { Button } from '@/components/Button/Button'

interface Props {
  filter: string
  onChange: (value: string) => void
}

export default function DemandChart({ filter, onChange }: Props) {
  return (
    <section className="bg-white rounded-xl shadow border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Predicción de demanda</h2>
        <div className="flex gap-2">
          <Button
            variant={filter === 'daily' ? 'SignupGreen' : 'OutlineGreen'}
            onClick={() => onChange('daily')}
          >
            Diario
          </Button>
          <Button
            variant={filter === 'weekly' ? 'SignupGreen' : 'OutlineGreen'}
            onClick={() => onChange('weekly')}
          >
            Semanal
          </Button>
          <Button
            variant={filter === 'monthly' ? 'SignupGreen' : 'OutlineGreen'}
            onClick={() => onChange('monthly')}
          >
            Mensual
          </Button>
        </div>
      </div>
      <div className="h-48 flex items-center justify-center bg-[#F4F6F8] rounded-lg">
        <span className="text-gray-500">[Gráfico de barras placeholder]</span>
      </div>
    </section>
)
}