'use client'

import { HeaderProps } from './Header.types'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/Button/Button'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Menu } from 'lucide-react'

const menuItems = {
  noAuth: [
    { label: 'Inicio', href: '/' },
    { label: '¿Cómo funciona?', href: '/info' },
    { label: 'Beneficios', href: '/beneficios' },
    { label: 'Ingreso', href: '/login', isButton: true },
  ],
  restaurante: [
    { label: 'Platillos', href: '/platillos' },
    { label: 'Ventas', href: '/ventas' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Análisis', href: '/analisis' },
    { label: 'Mi cuenta', href: '/login', isButton: true },
  ],
  proveedor: [
    { label: 'Mis productos', href: '/productos' },
    { label: 'Pedidos', href: '/pedidos' },
    { label: 'Mi cuenta', href: '/login', isButton: true },
  ],
  admin: [
    { label: 'Inicio', href: '/' },
    { label: 'Gestionar credenciales', href: '/credenciales' },
    { label: 'Análisis de alcance', href: '/alcance' },
    { label: 'Cerrar sesión', href: '/', isButton: true },
  ],
}

export default function Header({ type }: HeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { logout } = useAuth()
  const items = menuItems[type as keyof typeof menuItems] || menuItems.noAuth
  const buttonItem = items.find((i) => i.isButton)
  const navItems = items.filter((i) => !i.isButton)
  const showLogout = type === 'restaurante' || type === 'proveedor'

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-[#F2F2F2]/70">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/xitomate-logo.svg"
            alt="Xitomate"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav className="hidden lg:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-1 py-1 text-sm font-semibold transition ${
                pathname === item.href
                  ? 'text-[#E11D48] before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-5 before:h-0.5 before:bg-[#E11D48]'
                  : 'text-gray-800 hover:text-[#E11D48]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {buttonItem && (
            <Button
              variant="AccountRed"
              size="sm"
              onClick={() => router.push(buttonItem.href)}
            >
              {buttonItem.label}
            </Button>
          )}
          {showLogout && (
            <Button variant="SignUpRed" size="sm" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          )}
          <button className="lg:hidden text-gray-800 hover:text-[#E11D48]">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}