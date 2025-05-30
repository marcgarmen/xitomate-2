"use client";

import { useState } from "react";
import { loginUser } from "@/service/auth";
import { useRouter } from "next/navigation";

export function SignInFields() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(formData.email, formData.password);

      // Guardar token y datos
      localStorage.setItem("token", res.token);
      localStorage.setItem("userEmail", res.email);
      localStorage.setItem("role", res.role);

      alert("¡Inicio de sesión exitoso!");
      router.push("/"); // redirige al home o dashboard
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err);
      alert(err.message || "Error desconocido");
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
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
