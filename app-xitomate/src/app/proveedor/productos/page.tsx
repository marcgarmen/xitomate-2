'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  unidad: string;
  stock: number;
};

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nuevo, setNuevo] = useState<Partial<Producto>>({});
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const limpiar = () => setNuevo({});

  const handleAgregar = () => {
    if (nuevo.nombre && nuevo.precio && nuevo.unidad && nuevo.stock !== undefined) {
      setProductos([
        ...productos,
        {
          id: Date.now(),
          nombre: nuevo.nombre,
          precio: Number(nuevo.precio),
          unidad: nuevo.unidad,
          stock: Number(nuevo.stock),
        } as Producto,
      ]);
      limpiar();
    }
  };

  const handleActualizar = () => {
    if (!editandoId) return;

    setProductos((prev) =>
      prev.map((p) =>
        p.id === editandoId
          ? { ...p, ...nuevo, precio: Number(nuevo.precio), stock: Number(nuevo.stock) }
          : p
      )
    );
    setEditandoId(null);
    limpiar();
  };

  const handleEliminar = (id: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const empezarEdicion = (p: Producto) => {
    setEditandoId(p.id);
    setNuevo(p);
  };

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mis productos</h1>

      {/* Formulario */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Input
          placeholder="Nombre del producto"
          value={nuevo.nombre || ''}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
        />
        <Input
          placeholder="Precio"
          type="number"
          value={nuevo.precio || ''}
          onChange={(e) => setNuevo({ ...nuevo, precio: parseFloat(e.target.value) })}
        />
        <Input
          placeholder="Unidad (ej. kg, pieza)"
          value={nuevo.unidad || ''}
          onChange={(e) => setNuevo({ ...nuevo, unidad: e.target.value })}
        />
        <Input
          placeholder="Stock"
          type="number"
          value={nuevo.stock || ''}
          onChange={(e) => setNuevo({ ...nuevo, stock: parseInt(e.target.value) })}
        />
      </div>

      <Button onClick={editandoId ? handleActualizar : handleAgregar}>
        {editandoId ? 'Actualizar producto' : 'Agregar producto'}
      </Button>

      {/* Tabla */}
      <table className="w-full mt-10 border">
        <thead>
          <tr className="bg-[#A1C374] text-white">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Precio</th>
            <th className="px-4 py-2 text-left">Unidad</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="border-t">
              <td className="px-4 py-2">{producto.nombre}</td>
              <td className="px-4 py-2">${producto.precio.toFixed(2)}</td>
              <td className="px-4 py-2">{producto.unidad}</td>
              <td className="px-4 py-2">{producto.stock}</td>
              <td className="px-4 py-2 space-x-2">
                <Button variant="outline" onClick={() => empezarEdicion(producto)}>
                  Editar
                </Button>
                <Button variant="destructive" onClick={() => handleEliminar(producto.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}