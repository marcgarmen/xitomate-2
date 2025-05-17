import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import { Dish } from './AddDishModal';

interface Props {
  dishes: Dish[];
  onEdit: (idx: number) => void;
  onDelete: (idx: number) => void;
}

const DishTable: React.FC<Props> = ({ dishes, onEdit, onDelete }) => {
  if (dishes.length === 0) return <p className="text-lg text-gray-600">Aún no has agregado platillos.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse rounded-lg overflow-hidden">
        <thead className="bg-[#A1C374] text-black">
          <tr>
            <th className="px-4 py-3 text-left">Platillo</th>
            <th className="px-4 py-3 text-left">Ingredientes</th>
            <th className="px-4 py-3 text-left">Cantidades</th>
            <th className="px-2 py-3 w-16" />
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish, idx) => (
            <tr key={idx} className="odd:bg-[#A1C374]/30 even:bg-[#A1C374]/20">
              <td className="px-4 py-2 text-left font-medium">{dish.name}</td>

              <td className="px-4 py-2 text-left">
                {dish.ingredients.map((i) => <div key={i.name}>{i.name}</div>)}
              </td>

              <td className="px-4 py-2 text-left">
                {dish.ingredients.map((i) => <div key={`${i.name}-qty`}>{i.quantity}</div>)}
              </td>

              <td className="px-2 py-2 flex gap-2">
                <button onClick={() => onEdit(idx)} className="p-1 hover:text-[#A1C374]">
                  <Pencil size={18} />
                </button>
                <button onClick={() => onDelete(idx)} className="p-1 hover:text-[#F45E62]">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DishTable;