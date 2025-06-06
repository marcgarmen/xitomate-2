"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/Button/Button";
import { useEffect, useState } from "react";
import type { Product } from "./types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  initialProduct?: Product;
}

export default function AddProductModal({
  open,
  onClose,
  onSave,
  initialProduct,
}: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [unit, setUnit] = useState<"kg" | "piezas" | "otro">("kg");
  const [stock, setStock] = useState<number | "">("");

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setPrice(initialProduct.price);
      setUnit(initialProduct.unit);
      setStock(initialProduct.stock);
    } else {
      setName("");
      setPrice("");
      setUnit("kg");
      setStock("");
    }
  }, [initialProduct, open]);

  function handleSave() {
    if (!name.trim() || price === "" || stock === "") {
      return;
    }
    const product: Product = {
      id: initialProduct ? initialProduct.id : 0,
      name: name.trim(),
      price: Number(price),
      unit,
      stock: Number(stock),
    };
    onSave(product);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialProduct ? "Editar producto" : "Nuevo producto"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Nombre del producto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="number"
            min={0}
            step={0.01}
            placeholder="Precio"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
          />

          <select
            className="w-full px-2 py-1 border rounded"
            value={unit}
            onChange={(e) =>
              setUnit(e.target.value as "kg" | "piezas" | "otro")
            }
          >
            <option value="kg">kg</option>
            <option value="piezas">piezas</option>
            <option value="otro">otro</option>
          </select>

          <Input
            type="number"
            min={0}
            step={1}
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>

        <DialogFooter className="pt-4 flex justify-end gap-4">
          <Button variant="SignUpRed" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="SignupGreen"
            onClick={handleSave}
            disabled={!name.trim() || price === "" || stock === ""}
          >
            {initialProduct ? "Guardar" : "Agregar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}