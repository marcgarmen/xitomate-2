// src/service/auth.ts

// Registro de usuario
export async function registerUser(data: {
  email: string;
  password: string;
  nombre: string;
  role: string;
  ubicacion: string;
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  return response.json();
}

// Login de usuario
export async function loginUser(email: string, password: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

  const response = await fetch(url, {
    method: "POST",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error ${response.status}: ${error}`);
  }

  const data = await response.json();
  
  // Guardar el token en localStorage
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify({
    email: data.email,
    role: data.role,
    userId: data.userId
  }));

  return data;
}

// Logout de usuario
export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// Obtener el token actual
export function getToken() {
  return localStorage.getItem('token');
}

// Obtener el usuario actual
export function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}
