'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ProductApi } from '@/service/auth'

type Props = {
  product: ProductApi
  selected: boolean
  onToggle: (p: ProductApi) => void
}

export default function ProductCard({ product, selected, onToggle }: Props) {
  return (
    <Card
      onClick={() => onToggle(product)}
      className={`cursor-pointer transition hover:shadow-md ${
        selected ? 'ring-2 ring-green-500' : ''
      }`}
    >
      <CardHeader className="text-base font-semibold leading-snug">
        {product.nombre}
      </CardHeader>

      <CardContent className="space-y-1">
        <p className="text-sm">${product.precio} MXN</p>
        <p className="text-xs text-gray-600">
          Stock: {product.stock} {product.unidad}
        </p>
      </CardContent>
    </Card>
  )
}