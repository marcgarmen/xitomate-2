import { useState } from 'react';
import SelectionCard from '@/components/SelectionCard';

export default function RegistroPage() {
  const [selectedType, setSelectedType] = useState<'restaurante' | 'proveedor' | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <SelectionCard
        title="Restaurante"
        description="Gestiona insumos, automatiza pedidos y recibe propuestas inteligentes"
        icon="/icon-restaurante1.svg"
        selected={selectedType === 'restaurante'}
        onClick={() => setSelectedType('restaurante')}
      />

      <SelectionCard
        title="Proveedor local"
        description="Publica tus productos, gestiona pedidos y conectá con nuevos clientes"
        icon="/icon-proveedor1.svg"
        selected={selectedType === 'proveedor'}
        onClick={() => setSelectedType('proveedor')}
      />
    </div>
  );
}
