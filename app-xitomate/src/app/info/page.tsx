"use client";

export default function ComoFuncionaPage() {
  return (
    <main className="min-h-screen bg-[#FAF5F0] py-10 px-6">
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold text-[#0C051B]">
          ¿Cómo funciona Xitomate?
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Xitomate conecta directamente restaurantes con productores agrícolas
          locales. Nuestro sistema facilita la creación de pedidos, el control
          de inventarios, la confirmación de entregas y la proyección de compras
          futuras.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          <Card
            title="Automatización inteligente"
            description="Reduce el trabajo operativo. Xitomate automatiza pedidos según demanda real y disponibilidad de productores."
          />
          <Card
            title="Conexión directa con productores locales"
            description="Accede a insumos orgánicos y frescos sin intermediarios. Fortalece tu comunidad y reduce costos logísticos."
          />
          <Card
            title="Decisiones basadas en datos en tiempo real"
            description="Toma decisiones informadas. Anticipa necesidades con análisis de tendencias y comportamientos."
          />
          <Card
            title="Reducción de desperdicio alimentario"
            description="Pide lo justo, usa todo. Evita compras innecesarias y optimiza tu inventario."
          />
          <Card
            title="Sostenibilidad como ventaja competitiva"
            description="Tu restaurante alineado con lo que el mundo valora. Demuestra compromiso con prácticas responsables y locales."
          />
          <Card
            title="Escalabilidad y eficiencia operativa"
            description="Haz más con menos. Xitomate se adapta al crecimiento de tu restaurante sin complicaciones."
          />
        </div>
      </section>
    </main>
  );
}

type CardProps = {
  title: string;
  description: string;
};

function Card({ title, description }: CardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-left border-t-4 border-[#A1C374]">
      <h3 className="text-lg font-semibold text-[#0C051B]">{title}</h3>
      <p className="text-gray-600 mt-2 text-sm">{description}</p>
    </div>
  );
}
