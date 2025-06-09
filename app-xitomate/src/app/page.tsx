'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  return (
    <main className="h-screen bg-[#F2F2F2] flex items-center justify-center px-6 overflow-hidden">
      <section className="w-full max-w-7xl mx-auto py-20 flex flex-col-reverse md:flex-row items-center gap-16">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Haz crecer tu <span className="text-[#E11D48]">restaurante</span> sin desperdiciar un solo tomate 🍅
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            Automatiza el control de insumos y mejora tus decisiones con datos reales.
          </p>

          <button
            onClick={() => router.push('/registro')}
            className="cursor-pointer bg-[#E11D48] hover:bg-[#c9103b] text-white px-6 py-3 rounded-full font-bold shadow-md transition"
          >
            Regístrate gratis
          </button>
        </div>

        <div className="flex-1 relative flex justify-center items-center">
          <div className="absolute -z-10 w-[300px] h-[300px] bg-[#FBCFE8] rounded-[60%] blur-[60px]" />
          <Image
            src="/jitomate-3d.svg"
            alt="Jitomate 3D"
            width={600}
            height={600}
            className="drop-shadow-xl"
          />
        </div>
      </section>
    </main>
  );
}