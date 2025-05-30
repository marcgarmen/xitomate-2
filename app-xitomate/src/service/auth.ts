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

  return response.json(); // { token, role, email, userId }
}
