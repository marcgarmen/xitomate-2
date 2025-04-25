'use client';
import { useState } from 'react';
import Image from 'next/image';

const SelectionCardRestaurant = () => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-colors duration-200 ${
        selected ? 'bg-[#A1C374]' : 'bg-gray-200'
      } w-[433px] h-[108px]`}
    >
      <div className="min-w-[73px] min-h-[80px] relative">
        <Image
          src="/icon-restaurante1.svg"
          alt="Icono restaurante"
          width={73}
          height={80}
        />
      </div>
      <div>
        <h3 className="font-bold text-black">Restaurante</h3>
        <p className="text-black">
          Gestiona insumos, automatiza pedidos y recibe propuestas inteligentes
        </p>
      </div>
    </div>
  );
};

export default SelectionCardRestaurant;