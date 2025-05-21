'use client';

import Image from 'next/image';
import { Button } from '@/components/Button/Button';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="flex flex-col md:flex-row items-center max-w-5xl w-full bg-[#FFF8F1] p-10 rounded-lg shadow-md">
        
        {/* Formulario de inicio de sesión */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0 md:mr-6">
          <h1 className="text-3xl font-bold mb-4 text-black">Iniciar sesión</h1>
          <p className="mb-6 text-gray-700">Ingresa tu cuenta</p>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="border border-gray-300 rounded-md px-4 py-2"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="border border-gray-300 rounded-md px-4 py-2"
              required
            />
            <Button variant="SignupGreen" type="submit">Ingresar</Button>
          </form>
        </div>

        {/* Imagen del chef */}
        <div className="w-full md:w-1/2">
          <Image
            src="/chef.png"
            alt="Chef con verduras"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </div>
    </main>
  );
}
