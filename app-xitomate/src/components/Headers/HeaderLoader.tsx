"use client";

import Header from "./Header";
import { useAuth } from "@/context/AuthContext";

export default function HeaderLoader() {
  const { role } = useAuth();
  return <Header type={role} />;
}