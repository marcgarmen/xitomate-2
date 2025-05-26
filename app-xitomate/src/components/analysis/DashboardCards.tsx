import Etiqueta from '@/components/Test-Rosa/Etiqueta';

const cards = [
  {
    title: 'Insumos más usados esta semana',
    value: 'Jitomate, Cebolla, Tortilla',
  },
  {
    title: '% de insumos desperdiciados',
    value: '7%',
  },
  {
    title: 'Top 3 platillos más vendidos',
    value: 'Huevos revueltos, Tacos, Quesadillas',
  },
  {
    title: 'Proveedores con mejor entrega',
    value: 'Verduras MX, Granja Buena Vista',
  },
  {
    title: 'Predicción de demanda semanal',
    value: 'Aumentar compra de queso y pan',
  },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
        >
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            {card.title}
          </h3>
          <p className="text-lg font-bold text-gray-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
}