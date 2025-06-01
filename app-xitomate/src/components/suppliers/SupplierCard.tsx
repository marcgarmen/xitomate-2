'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  supplier: {
    id: string
    name: string
    coverage: string
    avatar: string
    topProducts: string[]
  }
}

export default function SupplierCard({ supplier }: Props) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex items-center gap-6">
        <Image
          src={supplier.avatar}
          alt={supplier.name}
          width={72}
          height={72}
          className="rounded-xl object-cover shrink-0"
        />
        <div className="flex-1 space-y-1">
          <h3 className="text-lg font-bold">{supplier.name}</h3>
          <p className="text-sm text-gray-600">{supplier.coverage}</p>
          <p className="text-xs text-gray-500">
            Top productos: {supplier.topProducts.join(', ')}
          </p>
        </div>
        <Link href={`/proveedores/${supplier.id}`}>
          <Button variant="outline">Ver productos</Button>
        </Link>
      </CardContent>
    </Card>
  )
}