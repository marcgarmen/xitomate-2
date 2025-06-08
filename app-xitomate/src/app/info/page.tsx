'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function InfoPage() {
  const router = useRouter();

  const pasos = [
    {
      title: '1. Regístrate en segundos',
      desc: 'Crea tu cuenta rápidamente y da de alta tu restaurante en un par de clics.',
      img: '/tomate-registro.svg',
    },
    {
      title: '2. Sube tu inventario',
      desc: 'Agrega productos e insumos con precios y cantidades para tener todo controlado.',
      img: '/tomate-inventario.svg',
    },
    {
      title: '3. Predice tu demanda',
      desc: 'Pronosticamos tus ventas para que compres justo la cantidad necesaria.',
      img: '/tomate-prediccion.svg',
    },
    {
      title: '4. Monitorea en tiempo real',
      desc: 'Visualiza tu stock y reportes desde cualquier dispositivo y toma decisiones al instante.',
      img: '/tomate-reportes.svg',
    },
  ];

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-6 py-12">

      <div className="text-center max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Así de fácil funciona <span className="text-[#E11D48]">Xitomate</span>
        </h1>
        <p className="text-lg text-gray-700">
          Desde el registro hasta el control total de tus insumos, sigue estos 4 pasos y olvídate del desperdicio.
        </p>
      </div>

      <section className="w-full max-w-5xl space-y-20">
        {pasos.map((paso, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={paso.title}
              className={`flex flex-col-reverse md:flex-row items-center ${
                isEven ? 'md:flex-row-reverse' : ''
              } gap-8`}
            >
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{paso.title}</h2>
                <p className="text-gray-700">{paso.desc}</p>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-40 h-40 relative">
                  <Image
                    src={paso.img}
                    alt={paso.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <button
        onClick={() => router.push('/registro')}
        className="mt-16 bg-[#E11D48] hover:bg-[#c9103b] text-white px-8 py-3 rounded-full font-bold shadow-md transition"
      >
        ¡Empieza ya y ahorra!
      </button>
    </main>
  );
}