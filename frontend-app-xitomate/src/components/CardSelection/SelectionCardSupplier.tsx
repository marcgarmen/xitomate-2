'use client';
import Image from 'next/image';

interface Props {
  selected: boolean;
  onClick: () => void;
}

const SelectionCardSupplier = ({ selected, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-colors duration-200 ${
        selected ? 'bg-[#A1C374]' : 'bg-gray-200'
      } w-[433px] h-[108px]`}
    >
      <div className="min-w-[73px] min-h-[80px] relative">
        <Image
          src="/icon-proveedor1.svg"
          alt="Icono proveedor"
          width={73}
          height={80}
        />
      </div>
      <div>
        <h3 className="font-bold text-black">Proveedor local</h3>
        <p className="text-black">
          Publica tus productos, gestiona pedidos y conectá con nuevos clientes
        </p>
      </div>
    </div>
  );
};

export default SelectionCardSupplier;
