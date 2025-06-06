"use client";

import { useState, useEffect } from "react";
import ProtectedSupplier from "@/components/ProtectedSupplier";
import OrderList from "@/components/Pedidos/OrderList";
import type { Pedido } from "@/components/Pedidos/types";
import { fetchPedidos } from "@/service/pedido";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    loadPedidos();
  }, []);

  async function loadPedidos() {
    const lista = await fetchPedidos();
    setPedidos(lista);
  }

  function handleAccept(id: number) {
    setPedidos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "aceptado" } : p
      )
    );
  }

  function handleReject(id: number) {
    setPedidos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "rechazado" } : p
      )
    );
  }

  return (
    <ProtectedSupplier>
      <main className="bg-[#FAF5F0] min-h-screen">
        <div className="container mx-auto max-w-5xl py-10">
          <h1 className="text-3xl font-bold mb-4">Pedidos recibidos</h1>
          <OrderList
            pedidos={pedidos}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        </div>
      </main>
    </ProtectedSupplier>
  );
}