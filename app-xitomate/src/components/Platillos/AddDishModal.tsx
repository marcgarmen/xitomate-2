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
import { Plus, Minus } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Dish } from './types'
import { useToast } from '@/components/toast/ToastProvider'

type Row = {
  id: number
  supplierProductId?: number
  nombreLibre: string
  cantidad: number | ''
  unidad: 'kg' | 'piezas' | 'otro'
}

interface Props {
  open: boolean
  onClose: () => void
  onSave: (dish: Dish) => void
  initialDish?: Dish
}

export default function AddDishModal({
  open,
  onClose,
  onSave,
  initialDish,
}: Props) {
  const toast = useToast()
  const [dishName, setDishName] = useState('')
  const [dishPrecio, setDishPrecio] = useState<number | ''>('')
  const [dishCategoria, setDishCategoria] = useState('')
  const [rows, setRows] = useState<Row[]>([
    { id: Date.now(), nombreLibre: '', cantidad: '', unidad: 'kg' },
  ])

  useEffect(() => {
    if (initialDish) {
      setDishName(initialDish.nombre)
      setDishPrecio(initialDish.precio)
      setDishCategoria(initialDish.categoria)
      const initialRows: Row[] = initialDish.ingredientes.map((ing, i) => ({
        id: i + 1,
        supplierProductId: ing.supplierProductId,
        nombreLibre: ing.nombreLibre || '',
        cantidad: ing.cantidad,
        unidad:
          ing.unidad === 'kg' || ing.unidad === 'piezas' || ing.unidad === 'otro'
            ? ing.unidad
            : 'otro',
      }))
      setRows(initialRows)
    } else {
      setDishName('')
      setDishPrecio('')
      setDishCategoria('')
      setRows([{ id: Date.now(), nombreLibre: '', cantidad: '', unidad: 'kg' }])
    }
  }, [initialDish, open])

  const addRow = () => {
    const last = rows.at(-1)!
    if (!last.nombreLibre.trim() || last.cantidad === '') return
    setRows([...rows, { id: Date.now(), nombreLibre: '', cantidad: '', unidad: 'kg' }])
  }
  const removeRow = (id: number) => setRows(rows.filter((r) => r.id !== id))
  const changeRow = (
    id: number,
    field: 'nombreLibre' | 'cantidad' | 'unidad',
    value: string | number
  ) => {
    setRows((rs) =>
      rs.map((r) =>
        r.id === id
          ? { ...r, [field]: field === 'cantidad' ? (value === '' ? '' : Number(value)) : value }
          : r
      )
    )
  }

  const handleSave = () => {
    if (!dishName.trim() || dishPrecio === '' || !dishCategoria.trim()) {
      toast('error', 'Por favor completa nombre, precio y categoría')
      return
    }
    const validRows = rows.filter(
      (r) => r.nombreLibre.trim() && r.cantidad !== '' && r.cantidad > 0
    )
    if (!validRows.length) {
      toast('error', 'Debes agregar al menos un ingrediente')
      return
    }
    const dishToSave: Dish = {
      id: initialDish ? initialDish.id : 0,
      nombre: dishName.trim(),
      precio: typeof dishPrecio === 'number' ? dishPrecio : Number(dishPrecio),
      categoria: dishCategoria.trim(),
      ingredientes: validRows.map((r) => ({
        supplierProductId: r.supplierProductId,
        nombreLibre: r.nombreLibre.trim(),
        cantidad: Number(r.cantidad),
        unidad: r.unidad,
      })),
    }
    onSave(dishToSave)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#101828]">
            {initialDish ? 'Editar platillo' : 'Nuevo platillo'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Nombre del platillo"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
          />
          <Input
            type="number"
            min={0}
            step={0.01}
            placeholder="Precio"
            value={dishPrecio}
            onChange={(e) =>
              setDishPrecio(e.target.value === '' ? '' : Number(e.target.value))
            }
          />
          <Input
            placeholder="Categoría"
            value={dishCategoria}
            onChange={(e) => setDishCategoria(e.target.value)}
          />

          {rows.map((row, idx) => (
            <div key={row.id} className="flex gap-2 items-center">
              {idx === rows.length - 1 ? (
                <button
                  onClick={addRow}
                  className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-full bg-[#5EBD6C] hover:bg-[#49A15A] text-white"
                >
                  <Plus className="size-4" />
                </button>
              ) : (
                <button
                  onClick={() => removeRow(row.id)}
                  className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-full bg-[#E11D48] hover:bg-[#d43f50] text-white"
                >
                  <Minus className="size-4" />
                </button>
              )}
              <Input
                className="flex-1"
                placeholder="Ingrediente (nombre)"
                value={row.nombreLibre}
                onChange={(e) => changeRow(row.id, 'nombreLibre', e.target.value)}
              />
              <Input
                className="w-24 text-center"
                type="number"
                min={0}
                step={0.01}
                placeholder="Cantidad"
                value={row.cantidad}
                onChange={(e) =>
                  changeRow(
                    row.id,
                    'cantidad',
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                }
              />
              <select
                className="px-2 py-1 border rounded"
                value={row.unidad}
                onChange={(e) => changeRow(row.id, 'unidad', e.target.value)}
              >
                <option value="kg">kg</option>
                <option value="piezas">piezas</option>
                <option value="otro">otro</option>
              </select>
            </div>
          ))}
        </div>

        <DialogFooter className="pt-6 flex justify-end gap-4">
          <Button variant="SignUpRed" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="SignupGreen"
            onClick={handleSave}
            disabled={!dishName.trim() || dishPrecio === '' || !dishCategoria.trim()}
          >
            {initialDish ? 'Guardar' : 'Agregar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}