'use client';

import { useState } from 'react';
import SelectionCard from '@/components/SelectionCard/SelectionCard'; // componente de la tarjeta de selección
import { Button } from '../../components/Button/Button'; // componente del boton

export default function RegistroPage() {
  const [selectedType, setSelectedType] = useState<'restaurante' | 'proveedor' | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = () => {
    if (!selectedType || !termsAccepted) {
      alert("Debes seleccionar el tipo de operación y aceptar los términos.");
      return;
    }
    // logica de envio 
    console.log("Formulario enviado");
  };

  return (
    <main className="min-h-screen px-6 py-12 bg-white flex flex-col items-center">
      {/* Título principal */}
      <h1 className="text-4xl font-bold mb-2">Registro</h1>
      <p className="text-gray-600 mb-8 text-center">Selecciona tu tipo de operación:</p>

      {/* Selección de tipo de ususario, osea si es restaurante o provedor */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <SelectionCard
          title="Restaurante"
          description="Gestiona insumos, automatiza pedidos y recibe propuestas inteligentes"
          icon="/icon-restaurante1.svg"
          selected={selectedType === 'restaurante'}
          onClick={() => setSelectedType('restaurante')}
        />

        <SelectionCard
          title="Proveedor local"
          description="Publica tus productos, gestiona pedidos y conectá con nuevos clientes"
          icon="/icon-proveedor1.svg"
          selected={selectedType === 'proveedor'}
          onClick={() => setSelectedType('proveedor')}
        />
      </div>

      {/* Formulario de datos */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl"
      >
        <input type="text" placeholder="Nombre(s)*" className="input" required />
        <input type="text" placeholder="Apellido(s)*" className="input" required />
        <input type="email" placeholder="Correo electrónico*" className="input" required />
        <input type="text" placeholder="Nombre del negocio (username)*" className="input" required />
        <input type="password" placeholder="Contraseña*" className="input" required />
        <input type="tel" placeholder="Teléfono del negocio*" className="input" required />
        <input type="password" placeholder="Confirmar contraseña*" className="input" required />
        <input type="text" placeholder="Ubicación / Dirección*" className="input" required />
      </form>

      {/* Términos y botón */}
      <div className="mt-8 w-full max-w-5xl flex flex-col gap-4 items-start">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
          />
          Acepto los <a href="#" className="underline text-blue-600">Términos y Condiciones</a>
        </label>

        <div className="self-center mt-4">
          <Button variant="SignupGreen" type="submit" onClick={handleSubmit}>
            Registrarme
          </Button>
        </div>
      </div>
    </main>
  );
}
