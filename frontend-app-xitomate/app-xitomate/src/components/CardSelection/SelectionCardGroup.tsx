'use client';
import { useState } from 'react';
import Image from 'next/image';

const SelectionCardGroup = () => {
  const [selected, setSelected] = useState<'restaurante' | 'proveedor' | null>(null);

  return (
    <div className="flex gap-6">
      {/* Restaurante */}
      <div
        onClick={() => setSelected('restaurante')}
        className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-colors duration-200 ${
          selected === 'restaurante' ? 'bg-[#A1C374]' : 'bg-gray-200'
        } w-[433px] h-[108px]`}
      >
        <div className="min-w-[73px] min-h-[80px] relative">
          <Image src="/icon-restaurante1.svg" alt="Icono restaurante" width={73} height={80} />
        </div>
        <div>
          <h3 className="font-bold text-black">Restaurante</h3>
          <p className="text-black">Gestiona insumos, automatiza pedidos y recibe propuestas inteligentes</p>
        </div>
      </div>

      {/* Proveedor */}
      <div
        onClick={() => setSelected('proveedor')}
        className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-colors duration-200 ${
          selected === 'proveedor' ? 'bg-[#A1C374]' : 'bg-gray-200'
        } w-[433px] h-[108px]`}
      >
        <div className="min-w-[73px] min-h-[80px] relative">
          <Image src="/icon-proveedor1.svg" alt="Icono proveedor" width={73} height={80} />
        </div>
        <div>
          <h3 className="font-bold text-black">Proveedor local</h3>
          <p className="text-black">Publica tus productos, gestiona pedidos y conectá con nuevos clientes</p>
        </div>
      </div>
    </div>
  );
};

export default SelectionCardGroup;