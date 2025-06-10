import { Button } from '@/components/Button/Button';

interface Props {
  filter: string;
  onChange: (value: string) => void;
}

export default function DemandChart({ filter, onChange }: Props) {
  const handleFilterChange = (value: string) => {
    onChange(value);
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Predicción de demanda</h2>
        <div className="flex gap-2">
          <Button
            variant="OutlineGreen"
            onClick={() => handleFilterChange('daily')}
          >
            Diario
          </Button>
          <Button
            variant="OutlineGreen"
            onClick={() => handleFilterChange('weekly')}
          >
            Semanal
          </Button>
          <Button
            variant="OutlineGreen"
            onClick={() => handleFilterChange('monthly')}
          >
            Mensual
          </Button>
        </div>
      </div>
      <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center text-gray-500">
        [Gráfico de barras placeholder]
      </div>
    </section>
  );
}