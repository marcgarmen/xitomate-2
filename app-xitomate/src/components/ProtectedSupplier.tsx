"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProtectedSupplier({ children }: { children: ReactNode }) {
  const { role, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (role === "noAuth") router.replace("/login");
  }, [ready, role, router]);

  if (!ready) return null;

  if (role === "proveedor") return <>{children}</>;

  return (
    <main className="min-h-screen bg-[#F2F2F2] flex flex-col items-center justify-center px-6 py-16">
      <Image
        src="/tomate-lock.svg"
        alt="Acceso Denegado"
        width={128}
        height={128}
        className="mb-6"
      />
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#E11D48] mb-4">
        Acceso denegado
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        No tienes permisos para ver esta página.
      </p>
      <button
        className="cursor-pointer bg-[#E11D48] hover:bg-[#c9103b] text-white px-8 py-4 rounded-full font-bold shadow-md transition"
        onClick={() => router.replace("/")}
      >
        Ir a inicio
      </button>
    </main>
  );
}