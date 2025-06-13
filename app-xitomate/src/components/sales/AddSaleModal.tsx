'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/Button/Button'
import { useState, useEffect } from 'react'
import type { Sale } from './types'

interface Props {
  open: boolean
  onClose: () => void
  onSave: (data: { dishId: string; quantity: number; metodoPago: string }, id?: number) => void
  editSale?: Sale | null
  dishes?: Array<{ id: number; nombre: string; precio: number }>
}

export function AddSaleModal({
  open,
  onClose,
  onSave,
  editSale,
  dishes = [],
}: Props) {
  const [selectedDishId, setSelectedDishId] = useState('')
  const [qty, setQty] = useState('')
  const [metodoPago, setMetodoPago] = useState('CARD')

  useEffect(() => {
    if (editSale) {
      setSelectedDishId(editSale.dishId.toString())
      setQty(editSale.quantity.toString())
      setMetodoPago(editSale.metodoPago)
    } else {
      setSelectedDishId('')
      setQty('')
      setMetodoPago('CARD')
    }
  }, [editSale])

  const handleSave = () => {
    const cantidad = Number(qty)
    if (!selectedDishId || cantidad <= 0) return
    onSave({ dishId: selectedDishId, quantity: cantidad, metodoPago }, editSale?.id)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#101828] text-2xl font-bold">
            {editSale ? 'Editar venta' : 'Registrar venta'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <select
            className="w-full rounded-md p-2 bg-white border border-input text-sm shadow-sm focus-visible:ring-ring/50 outline-none"
            value={selectedDishId}
            onChange={(e) => setSelectedDishId(e.target.value)}
          >
            <option value="">Seleccionar plato</option>
            {dishes.map((d) => (
              <option key={d.id} value={d.id.toString()}>
                {d.nombre} – ${d.precio.toFixed(2)}
              </option>
            ))}
          </select>

          <Input
            type="number"
            placeholder="Cantidad"
            value={qty}
            min={1}
            onChange={(e) => setQty(e.target.value)}
          />

          <select
            className="w-full rounded-md p-2 bg-white border border-input text-sm shadow-sm focus-visible:ring-ring/50 outline-none"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="CARD">Tarjeta</option>
            <option value="CASH">Efectivo</option>
            <option value="COD">Contra entrega</option>
          </select>
        </div>

        <DialogFooter className="pt-6">
          <Button variant="SignUpRed" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="SignupGreen"
            onClick={handleSave}
            disabled={!selectedDishId || !qty || Number(qty) <= 0}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}