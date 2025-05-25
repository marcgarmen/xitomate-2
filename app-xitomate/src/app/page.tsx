"use client";

import { Button } from "@/components/Button/Button"; // componente de "Button"
import { useRouter } from "next/navigation"; // redireccionamiento
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <section className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col-reverse md:flex-row items-center gap-12">

        {/* Texto introductorio */}
        <div className="flex-1">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Del campo a tu cocina, <br />
            sin desperdicio y con{" "}
            <span className="text-green-600">precisión</span>
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            Automatizamos y predecimos el abastecimiento de tu negocio, en base a las tendencias de la industria.
          </p>

          {/* componente Button */}
          <Button
            buttonType="SignUpRed" // se puede cambiar el color "SignupGreen" o "AccountRed"
            onClick={() => router.push("/registro")} // Redirección a la página de registro
          >
            Registro
          </Button>
        </div>

        {/* Imagen con fondo*/}
        <div className="flex-1 relative flex justify-center items-center">
          {/* óvalo */}
          <Image
            src="/ovalo.png" // óvalo
            alt="Fondo decorativo"
            width={400}
            height={400}
            className="absolute z-0 translate-x-6 translate-y-6 pointer-events-none"
          />

          {/* Imagen de la bolsa de xitomate */}
          <Image
            src="/bolsa.png"
            alt="Bolsa de verduras"
            width={360}
            height={360}
            className="z-10 relative"
          />
        </div>
      </section>
    </main>
  );
}
