'use client';

import { useState } from 'react';
import { Button } from '@/components/Button/Button'; // componente del botón
import SelectionCardRestaurant from '@/components/CardSelection/SelectionCardRestaurant'; // componente de restaurante
import SelectionCardSupplier from '@/components/CardSelection/SelectionCardSupplier'; // componente de proveedor

export default function RegistroPage() {
  const [selectedType, setSelectedType] = useState<'restaurante' | 'proveedor' | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false); // Estado para mostrar/ocultar términos

  const handleSubmit = () => {
    if (!selectedType || !termsAccepted) {
      alert("Debes seleccionar el tipo de operación y aceptar los términos.");
      return;
    }
    // Lógica de envío
    console.log("Formulario enviado");
  };

  return (
    <main className="min-h-screen px-6 py-12 bg-white flex flex-col items-center">
      {/* Título principal */}
      <h1 className="text-4xl font-bold mb-2">Registro</h1>
      <p className="text-gray-600 mb-8 text-center">Selecciona tu tipo de operación:</p>

      {/* Tarjetas de selección */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <SelectionCardRestaurant
          selected={selectedType === 'restaurante'}
          onClick={() => setSelectedType('restaurante')}
        />

        <SelectionCardSupplier
          selected={selectedType === 'proveedor'}
          onClick={() => setSelectedType('proveedor')}
        />
      </div>

      {/* Formulario */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl"
      >
        <input type="text" placeholder="Nombre(s)*" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1C374]" required />
        <input type="text" placeholder="Apellido(s)*" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1C374]" required />
        <input type="email" placeholder="Correo electrónico*" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1C374]" required />
        <input type="text" placeholder="Nombre del negocio (username)*" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1C374]" required />
        <input type="password" placeholder="Contraseña*" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1C374]" required />
        <input type="tel" placeholder="Teléfono del negocio*" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1C374]" required />
        <input type="password" placeholder="Confirmar contraseña*" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1C374]" required />
        <input type="text" placeholder="Ubicación / Dirección*" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1C374]" required />
      </form>

      {/* Términos y botón */}
      <div className="mt-8 w-full max-w-5xl flex flex-col gap-4 items-start">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
          />
          Acepto los{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowTerms(true);
            }}
            className="underline text-blue-600"
          >
            Términos y Condiciones
          </a>
        </label>

        <div className="self-center mt-4">
          <Button variant="SignupGreen" type="submit">
            Registrarme
          </Button>
        </div>
      </div>

      {/* Modal de términos */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg relative">
            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">Términos y Condiciones</h2>
            <p className="text-sm text-gray-700 max-h-[60vh] overflow-y-auto">
              Al utilizar la plataforma Xitomate, usted acepta de manera plena e incondicional los presentes Términos y Condiciones. El acceso y uso de los servicios requiere que el usuario se registre con información verídica, siendo responsable del uso de su cuenta, la cual es personal e intransferible. Xitomate hace uso de tecnologías de inteligencia artificial, incluyendo modelos de OpenAI como ChatGPT, para procesar datos y mejorar la experiencia del usuario. Al registrarse y utilizar el sistema, el usuario acepta que la información ingresada, como platillos, precios, ventas e inventario, podrá ser utilizada para análisis, predicciones y mejora del sistema. Asimismo, el usuario acepta que esta información puede ser compartida dentro de la plataforma con otros perfiles (como proveedores o administradores) de forma controlada, y que podrá ser almacenada o tratada sin afectar datos sensibles ni personales. El uso de Xitomate debe realizarse conforme a la ley, estando prohibido todo uso fraudulento, automatizado o que comprometa la seguridad o integridad de la plataforma. Todo el contenido, código fuente, diseño, base de datos y estructura de Xitomate es propiedad exclusiva de sus desarrolladores. La plataforma no garantiza disponibilidad continua, pudiendo estar sujeta a mantenimientos o interrupciones. Las transacciones realizadas por los restaurantes solo se procesarán si los pedidos son aceptados por los proveedores, sin que Xitomate actúe como intermediario financiero. El uso de la plataforma implica la aceptación de posibles modificaciones a estos términos, las cuales serán publicadas oportunamente y se considerarán aceptadas si el usuario continúa utilizando el sistema.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

