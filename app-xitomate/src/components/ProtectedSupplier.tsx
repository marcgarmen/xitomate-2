"use client";

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
    <main className="min-h-screen flex items-center justify-center bg-[#FAF5F0]">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-[#E11D48]">Acceso denegado</h1>
        <p>No tienes permisos para ver esta página.</p>
        <button
          className="px-4 py-2 mt-3 rounded-md bg-[#E11D48] text-white"
          onClick={() => router.replace("/")}
        >
          Ir a inicio
        </button>
      </div>
    </main>
  );
}