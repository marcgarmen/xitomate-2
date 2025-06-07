'use client';

import { HeaderProps } from './Header.types';
import Link from 'next/link';
import Image from 'next/image';
import { FaUserCog } from 'react-icons/fa';
import { Button } from '@/components/Button/Button';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

const COLORS = {
  green: '#A1C374',
  red: '#F45E62',
  black: '#0C051B',
  redLight: '#FDE7E7',
};

const menuItems = {
  noAuth: [
    { label: 'Inicio', href: '/' },
    { label: '¿Cómo funciona?', href: '/info' },
    { label: 'Beneficios', href: '/beneficios' },
    { label: 'Ingreso', href: '/login', isButton: true }
  ],
  restaurante: [
    { label: 'Inicio', href: '/' },
    { label: 'Platillos', href: '/platillos' },
    { label: 'Ventas', href: '/ventas' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Análisis', href: '/analisis' },
    { label: 'ExploraIA', href: '/exploraia' },
    { label: 'Mi cuenta', href: '/login', isButton: true }
  ],
  proveedor: [
    { label: 'Inicio', href: '/' },
    { label: 'Mis productos', href: '/productos' },
    { label: 'Pedidos', href: '/pedidos' },
    { label: 'Análisis', href: '/analisis' },
    { label: 'ExploraIA', href: '/exploraia' },
    { label: 'Mi cuenta', href: '/login', isButton: true }
  ],
  admin: [
    { label: 'Inicio', href: '/' },
    { label: 'Gestionar credenciales', href: '/credenciales' },
    { label: 'Análisis de alcance', href: '/alcance' },
    { label: 'Cerrar sesión', href: '/', isButton: true }
  ]
};

export default function Header({ type }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const [bgColor, setBgColor] = useState<string>('#FFFFFF');

  useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      const computed = getComputedStyle(main).backgroundColor;
      setBgColor(computed);
    }
  }, [pathname]);

  const items = menuItems[type as keyof typeof menuItems] ?? menuItems.noAuth;
  const buttonItem = items.find(i => i.isButton);
  const navItems = items.filter(i => !i.isButton);
  const showLogout = type === 'restaurante' || type === 'proveedor';

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header style={{ backgroundColor: bgColor }} className="w-full shadow-md">
      <div className="flex justify-between items-center w-full max-w-[1340px] mx-auto px-10 h-[62px]">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/xitomate-logo.svg"
            alt="Xitomate"
            width={130}
            height={40}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="flex gap-10">
          {navItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold transition-colors duration-200"
              style={{ color: COLORS.black }}
              onMouseEnter={e => (e.currentTarget.style.color = COLORS.green)}
              onMouseLeave={e => (e.currentTarget.style.color = COLORS.black)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {buttonItem && (
            <Link
              href={buttonItem.href}
              className="flex items-center gap-2 px-5 py-2 border rounded-full font-semibold text-sm shadow-md transition-all duration-200"
              style={{
                backgroundColor: COLORS.redLight,
                borderColor: COLORS.red,
                color: COLORS.red
              }}
            >
              {type !== 'admin' && type !== 'noAuth' && (
                <FaUserCog className="text-[#F45E62]" />
              )}
              {buttonItem.label}
            </Link>
          )}

          {showLogout && (
            <Button size="default" variant="SignUpRed" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}