'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BeneficiosPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F2F2F2] flex flex-col items-center px-6 py-16">
      <header className="max-w-3xl text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Descubre los Beneficios de Xitomate
        </h1>
        <p className="text-lg text-gray-700">
          Simplifica tu gestión de insumos, maximiza tu rentabilidad y di adiós al desperdicio
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
        <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
          <Image
            src="/tomate-tiempo.svg"
            alt="Ahorro de Tiempo"
            width={96}
            height={96}
            className="mb-4"
          />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ahorro de Tiempo</h2>
          <p className="text-gray-700">
            Automatiza pedidos y reportes para dedicar más tiempo a lo que importa.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
          <Image
            src="/tomate-desperdicio.svg"
            alt="Reducción de Desperdicio"
            width={96}
            height={96}
            className="mb-4"
          />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Reducción de Desperdicio</h2>
          <p className="text-gray-700">
            Predice tu demanda con precisión y evita mermas innecesarias.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
          <Image
            src="/tomate-datos.svg"
            alt="Decisiones con Datos"
            width={96}
            height={96}
            className="mb-4"
          />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Decisiones con Datos</h2>
          <p className="text-gray-700">
            Accede a gráficos e indicadores para optimizar tu estrategia.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
          <Image
            src="/tomate-control.svg"
            alt="Control en Tiempo Real"
            width={96}
            height={96}
            className="mb-4"
          />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Control en Tiempo Real</h2>
          <p className="text-gray-700">
            Monitorea tu inventario y ajusta tus compras al instante.
          </p>
        </div>
      </section>

      <div className="mt-16">
        <button
          onClick={() => router.push('/registro')}
          className="cursor-pointer bg-[#E11D48] hover:bg-[#c9103b] text-white px-8 py-4 rounded-full font-bold shadow-md transition"
        >
          Empieza Ahora
        </button>
      </div>
    </main>
  );
}