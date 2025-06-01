'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  supplier: {
    id: string
    name: string
    coverage: string
    avatar: string
    topProducts?: string[]
  }
}

export default function SupplierCard({ supplier }: Props) {
  const products = supplier.topProducts ?? []

  return (
    <Card>
      <CardContent className="p-6 flex items-center gap-6">
        <Image
          src={supplier.avatar}
          alt={supplier.name}
          width={72}
          height={72}
          className="rounded-xl object-cover shrink-0"
        />

        <div className="flex-1 space-y-1">
          <h3 className="text-lg font-bold">{supplier.name}</h3>

          <p className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-1" />
            {supplier.coverage}
          </p>

          <p className="text-xs text-gray-500">
            Top productos:&nbsp;
            {products.length ? products.join(', ') : 'Sin productos'}
          </p>
        </div>

        <Link href={`/proveedores/${supplier.id}`}>
          <Button
            variant="outline"
            className="cursor-pointer border-gray-300 hover:bg-gray-100"
          >
            Ver productos
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}