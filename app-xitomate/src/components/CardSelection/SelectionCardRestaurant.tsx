'use client';
import Image from 'next/image';

interface Props {
  selected: boolean;
  onClick: () => void;
}

const SelectionCardRestaurant = ({ selected, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-colors duration-200 ${
        selected ? 'bg-[#A1C374]' : 'bg-gray-200'
      } w-[433px] h-[108px]`}
    >
      <div className="min-w-[73px] min-h-[80px] relative">
        <Image
          src="/restaurante-icon.svg"
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
