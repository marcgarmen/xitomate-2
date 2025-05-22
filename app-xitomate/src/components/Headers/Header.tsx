"use client";

import { HeaderProps } from "./Header.types";
import Link from "next/link";
import Image from "next/image";
import { FaUserCog } from "react-icons/fa";

// Colores base usados en los estilos inline
const COLORS = {
  green: "#A1C374",
  red: "#F45E62",
  black: "#0C051B",
  gray: "#F2F2F2",
  redLight: "#FDE7E7",
};

// Menús para diferentes tipos de usuario
const menuItems = {
  noAuth: [
    { label: "Inicio", href: "/" },
    { label: "¿Cómo funciona?", href: "/info" },
    { label: "Beneficios", href: "/beneficios" },
    { label: "Ingreso", href: "/login", isButton: true }, // botón a login
  ],
  restaurante: [
    { label: "Inicio", href: "/" },
    { label: "Platillos", href: "/platillos" },
    { label: "Pedidos", href: "/pedidos" },
    { label: "Contacto", href: "/contacto" },
    { label: "Análisis", href: "/analisis" },
    { label: "ExploraIA", href: "/exploraia" },
    { label: "Mi cuenta", href: "/login", isButton: true }, // redirige a login
  ],
  proveedor: [
    { label: "Inicio", href: "/" },
    { label: "Mis productos", href: "/productos" },
    { label: "Pedidos", href: "/pedidos" },
    { label: "Análisis", href: "/analisis" },
    { label: "ExploraIA", href: "/exploraia" },
    { label: "Mi cuenta", href: "/login", isButton: true }, // redirige a login
  ],
  admin: [
    { label: "Inicio", href: "/" },
    { label: "Gestionar credenciales", href: "/credenciales" },
    { label: "Análisis de alcance", href: "/alcance" },
    { label: "Cerrar sesión", href: "/", isButton: true },
  ],
};

export default function Header({ type }: HeaderProps) {
  const items = menuItems[type];
  const isNoAuth = type === "noAuth";

  const buttonItem = items.find((i) => i.isButton);
  const navItems = items.filter((i) => !i.isButton);

  return (
    <header
      className={`w-full shadow-md ${isNoAuth ? "bg-[#F2F2F2]" : "bg-white"}`}
    >
      <div className="flex justify-between items-center w-full max-w-[1340px] mx-auto px-10 h-[62px]">
        {/* Logo */}
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

        {/* Menú de navegación */}
        <nav className="flex gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold transition-colors duration-200"
              style={{ color: COLORS.black }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.green)}
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.black)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Botón derecho (login o cuenta) */}
        {buttonItem && (
          <Link
            href={buttonItem.href}
            className="flex items-center gap-2 px-5 py-2 border rounded-full font-semibold text-sm shadow-md transition-all duration-200"
            style={{
              backgroundColor: COLORS.redLight,
              borderColor: COLORS.red,
              color: COLORS.red,
            }}
          >
            {/* Ícono de engrane excepto en modo no autenticado */}
            {type !== "admin" && type !== "noAuth" && (
              <FaUserCog className="text-[#F45E62]" />
            )}
            {buttonItem.label}
          </Link>
        )}
      </div>
    </header>
  );
}
