"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Role = "noAuth" | "restaurante" | "proveedor";

export interface AuthCtx {
  role: Role;
  ready: boolean;
  login: (token: string, rawRole: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthCtx>({
  role: "noAuth",
  ready: false,
  login: () => {},
  logout: () => {},
});

function normalizeRole(raw: string | null | undefined): Role {
  if (!raw) return "noAuth";
  const r = raw.toLowerCase();
  if (r.includes("rest")) return "restaurante";
  if (r.includes("prov") || r.includes("suppl")) return "proveedor";
  return "noAuth";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("noAuth");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("xitomate_token") ||
      localStorage.getItem("token") ||
      "";
    const storedRole = normalizeRole(localStorage.getItem("role"));
    if (token) setRole(storedRole);
    setReady(true);
  }, []);

  const login = (token: string, rawRole: string) => {
    const normalized = normalizeRole(rawRole);
    localStorage.setItem("xitomate_token", token);
    localStorage.setItem("role", normalized);
    setRole(normalized);
  };

  const logout = () => {
    localStorage.clear();
    setRole("noAuth");
  };

  return (
    <AuthContext.Provider value={{ role, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);