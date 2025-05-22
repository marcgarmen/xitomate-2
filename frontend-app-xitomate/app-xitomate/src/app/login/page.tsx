"use client";

import Image from "next/image";
import { SignInFields } from "@/components/SignInFields/SignInFields"; // componente 

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-6">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden max-w-5xl w-full">
        {/* Imagen del chef */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <Image
            src="/chef.png" // chef
            alt="Chef con canasta"
            width={350}
            height={450}
            className="object-contain"
          />
        </div>

        {/* Formulario de inicio de sesión */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          {/* Título principal */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Iniciar sesión</h2>
          <p className="text-gray-600 mb-8">Ingresa tu cuenta</p>

          {/* componente de login */}
          <SignInFields />
        </div>
      </div>
    </main>
  );
}
