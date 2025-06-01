'use client'

import { Card, CardContent } from '@/components/ui/card'
import Etiqueta from '@/components/Test-Rosa/Etiqueta'
import { EtiquetaColor } from '@/components/Test-Rosa/Etiqueta.types'
import { ProductApi } from '@/service/auth'

interface Props {
  product: ProductApi
}

export default function ProductCard({ product }: Props) {
  const stockColor = (): EtiquetaColor =>
    product.stock === 0 ? 'error' : product.stock < 10 ? 'warning' : 'success'

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-1">
        <h4 className="font-semibold">{product.nombre}</h4>
        <p className="text-sm text-gray-600">Unidad: {product.unidad}</p>
        <p className="text-sm text-gray-600">
          Precio:&nbsp;<span className="font-bold">${product.precio}</span>
        </p>
        <Etiqueta text={`Stock: ${product.stock}`} color={stockColor()} />
      </CardContent>
    </Card>
  )
}