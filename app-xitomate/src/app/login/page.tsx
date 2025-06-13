'use client'

import Image from 'next/image'
import { SignInFields } from '@/components/SignInFields/SignInFields'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const { role, ready } = useAuth()

  useEffect(() => {
    if (!ready) return
    if (role === 'restaurante') {
      router.replace('/platillos')
    } else if (role === 'proveedor') {
      router.replace('/productos')
    }
  }, [ready, role, router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F2F2F2] px-6">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full">
        <div className="w-full md:w-1/2 flex justify-center items-center p-6 bg-[#E11D48]/10">
          <Image
            src="/tomates-todos.svg"
            alt="Tomates felices"
            width={350}
            height={350}
            className="object-contain"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Iniciar sesión
          </h2>
          <p className="text-gray-600 mb-8">Ingresa tu cuenta</p>
          <SignInFields />
          <p className="text-center text-gray-600 mt-6">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => router.push('/registro')}
              className="cursor-pointer text-[#E11D48] font-semibold hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}