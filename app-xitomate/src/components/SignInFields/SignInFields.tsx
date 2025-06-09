'use client';

import { useState } from 'react';
import { loginUser } from '@/service/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/toast/ToastProvider';

export function SignInFields() {
  const router = useRouter();
  const { login } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(formData.email, formData.password);
      login(res.token, res.role.toLowerCase());
      localStorage.setItem('userEmail', res.email);
      toast('success', '¡Inicio de sesión exitoso!');
      router.push('/');
    } catch (err: any) {
      toast('error', err?.response?.data?.error || err.message || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1C374]"
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A1C374]"
      />
      <button
        type="submit"
        className="w-full bg-[#A1C374] text-white py-2 px-4 rounded-md hover:bg-[#8AB25A]"
        disabled={loading}
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  );
}