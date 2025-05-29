import { Button } from '@/components/Button/Button';

export default function PurchaseRecommendations() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Recomendación de compra automática</h2>
      <p className="text-gray-700 mb-4">
        Con base en tus ventas y platillos del menú, esta es la lista sugerida.
      </p>
      <div className="flex gap-4 flex-wrap">
        <Button variant="OutlineGreen">Generar PDF</Button>
        <Button variant="OutlineGreen">Editar manualmente lista</Button>
        <Button variant="OutlineGreen">Enviar pedido a proveedor</Button>
      </div>
    </section>
  );
}