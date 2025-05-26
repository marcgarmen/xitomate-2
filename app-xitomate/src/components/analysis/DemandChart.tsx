import { Button } from '@/components/Button/Button';

interface Props {
  filter: string;
  onChange: (value: string) => void;
}

export default function DemandChart({ filter, onChange }: Props) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Predicción de demanda</h2>
        <div className="flex gap-2">
          <Button
            variant="OutlineGreen"
            onClick={() => onChange('week')}
          >
            Esta semana
          </Button>
          <Button
            variant="OutlineGreen"
            onClick={() => onChange('next')}
          >
            Siguiente semana
          </Button>
          <Button
            variant="OutlineGreen"
            onClick={() => onChange('month')}
          >
            Último mes
          </Button>
        </div>
      </div>
      <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center text-gray-500">
        [Gráfico de barras placeholder]
      </div>
    </section>
  );
}