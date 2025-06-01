'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Props {
  product: {
    id: string
    name: string
    unit: string
    price: number
    organic: boolean
  }
}

export default function ProductCard({ product }: Props) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-0.5">
        <h4 className="font-semibold">{product.name}</h4>
        <p className="text-sm text-gray-600">Unidad: {product.unit}</p>
        <p className="text-sm text-gray-600">
          Precio:&nbsp;<span className="font-bold">${product.price}</span>
        </p>
        {product.organic && <Badge>Orgánico</Badge>}
      </CardContent>
    </Card>
  )
}