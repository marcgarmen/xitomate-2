'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import SelectionCardRestaurant from '@/components/CardSelection/SelectionCardRestaurant';
import SelectionCardSupplier from '@/components/CardSelection/SelectionCardSupplier';
import { registerUser } from '@/service/auth';
import { useToast } from '@/components/toast/ToastProvider';

export default function RegistroPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'restaurante' | 'proveedor' | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    ubicacion: '',
  });

  const addToast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!selectedType || !termsAccepted) {
      addToast('error', 'Debes seleccionar tipo y aceptar los términos');
      return;
    }

    try {
      const payload = {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        ubicacion: formData.ubicacion,
        role: selectedType === 'restaurante' ? 'RESTAURANT' : 'SUPPLIER',
      };

      await registerUser(payload);
      addToast('success', '¡Registro exitoso!');

      if (selectedType === 'restaurante') {
        router.push('/platillos');
      } else {
        router.push('/productos');
      }
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      addToast('error', 'Hubo un error al registrar. Intenta de nuevo.');
    }
  };

  return (
    <main className="min-h-screen px-6 py-12 bg-white flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Registro</h1>
      <p className="text-gray-600 mb-8 text-center">Selecciona tu tipo de operación:</p>

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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl"
      >
        <input
          name="nombre"
          type="text"
          placeholder="Nombre del negocio*"
          value={formData.nombre}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico*"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña*"
          value={formData.password}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <input
          name="ubicacion"
          type="text"
          placeholder="Ubicación / Dirección*"
          value={formData.ubicacion}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <div className="col-span-2 flex flex-col gap-4 mt-4">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            ¿Aceptas nuestros{' '}
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowTerms(true);
              }}
              className="text-[#E11D48] font-semibold hover:underline"
            >
              Términos y Condiciones
            </button>
            ?
          </label>
          <div className="self-center mt-4">
            <Button variant="SignupGreen" type="submit">
              Registrarme
            </Button>
          </div>
        </div>
      </form>

      {showTerms && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg relative">
            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Términos y Condiciones</h2>
            <p className="text-sm text-gray-700 max-h-[60vh] overflow-y-auto">
              Al utilizar la plataforma Xitomate...
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

const inputClass =
  'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1C374]';