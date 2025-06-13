'use client'

import { useState } from 'react'
import { loginUser } from '@/service/auth'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/components/toast/ToastProvider'

export function SignInFields() {
  const router = useRouter()
  const { login } = useAuth()
  const toast = useToast()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await loginUser(formData.email, formData.password)
      const normalizedRole = res.role.toLowerCase()
      login(res.token, normalizedRole)
      localStorage.setItem('userEmail', res.email)
      toast('success', '¡Inicio de sesión exitoso!')

      if (normalizedRole === 'restaurante') {
        router.push('/platillos')
      } else if (normalizedRole === 'proveedor') {
        router.push('/productos')
      } else {
        router.push('/')
      }
    } catch (err: any) {
      toast(
        'error',
        err?.response?.data?.error ||
          err.message ||
          'Credenciales incorrectas'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
        className="
          w-full
          px-6 py-3
          rounded-full
          border border-gray-300
          text-base font-medium
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-[#E11D48]
          transition
        "
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
        className="
          w-full
          px-6 py-3
          rounded-full
          border border-gray-300
          text-base font-medium
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-[#E11D48]
          transition
        "
      />
      <button
        type="submit"
        disabled={loading}
        className={`
          w-full
          bg-[#E11D48] text-white
          px-6 py-3
          rounded-full
          text-base font-semibold
          shadow-lg
          hover:bg-[#c9103b]
          disabled:opacity-50 disabled:cursor-not-allowed
          cursor-pointer
          transition-transform
          hover:-translate-y-[1px]
          active:translate-y-0
          focus:outline-none focus:ring-2 focus:ring-[#E11D48]/50
        `}
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  )
}