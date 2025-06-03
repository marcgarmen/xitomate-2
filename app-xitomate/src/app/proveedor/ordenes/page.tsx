"use client";

import { useEffect, useState } from "react";

export default function OrdenesProveedorPage() {
  const [ordenes, setOrdenes] = useState<any[]>([]);

  useEffect(() => {
    const supplierId = 1;

    fetch(`http://localhost:8081/supplier/orders/all?supplierId=${supplierId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta del backend:", data);

        // Si ya es un array directamente
        if (Array.isArray(data)) {
          setOrdenes(data);
        }
        // Si viene dentro de un objeto
        else if (Array.isArray(data.ordenes)) {
          setOrdenes(data.ordenes);
        }
        // Si no es válido
        else {
          console.error("La respuesta no contiene un arreglo válido.");
          setOrdenes([]);
        }
      })
      .catch((error) => {
        console.error("Error al cargar órdenes:", error);
        setOrdenes([]);
      });
  }, []);

  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-6">Órdenes recibidas</h1>

      {ordenes.length === 0 ? (
        <p className="text-gray-600">No hay órdenes disponibles.</p>
      ) : (
        <div className="space-y-4">
          {ordenes.map((orden: any) => (
            <div
              key={orden.id}
              className="bg-gray-100 p-4 rounded-md shadow-md flex flex-col md:flex-row justify-between md:items-center"
            >
              <div>
                <p><strong>Restaurante:</strong> {orden.restaurantName}</p>
                <p><strong>Fecha:</strong> {orden.fecha}</p>
                <p><strong>Total:</strong> ${orden.total}</p>
                <p><strong>Método de pago:</strong> {orden.paymentMethod}</p>
                <p><strong>Estado:</strong> {orden.status}</p>
              </div>
              {/* Aquí podrías agregar acciones más adelante */}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
