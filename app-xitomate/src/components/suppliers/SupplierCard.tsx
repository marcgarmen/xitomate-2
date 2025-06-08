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
    <Card className="rounded-2xl border-0 shadow-sm hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6 flex items-center gap-6">
        <div className="w-16 h-16 relative flex-shrink-0">
          <Image
            src={supplier.avatar}
            alt={supplier.name}
            width={72}
            height={72}
            className="rounded-full object-cover border-2 border-[#A1C374]"
          />
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {supplier.name}
          </h3>

          <p className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-1 text-[#A1C374]" />
            {supplier.coverage}
          </p>

          <p className="text-sm text-gray-700">
            <span className="font-medium">Productos recientes:</span>{' '}
            {products.length ? products.join(', ') : 'Sin productos'}
          </p>
        </div>

        <Link href={`/marketplace/${supplier.id}`} className="flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="
              border-gray-600
              text-gray-900
              bg-transparent
              hover:bg-gray-100
              px-4 py-2 
              font-medium 
              cursor-pointer
            "
          >
            Ver productos
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}