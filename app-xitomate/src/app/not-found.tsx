"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F2F2F2] flex flex-col items-center justify-center px-6 py-16">
      <Image
        src="/tomate-lock.svg"
        alt="404 Página no encontrada"
        width={128}
        height={128}
        className="mb-6"
      />
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        404 - Página no encontrada
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Lo sentimos, la página que buscas no existe.
      </p>
      <button
        className="cursor-pointer bg-[#E11D48] hover:bg-[#c9103b] text-white px-8 py-4 rounded-full font-bold shadow-md transition"
        onClick={() => router.push("/")}
      >
        Ir a inicio
      </button>
    </main>
  );
}