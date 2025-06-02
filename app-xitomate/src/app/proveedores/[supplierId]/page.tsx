import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import SupplierCatalogClient from '@/components/suppliers/SupplierCatalogClient'

export const metadata = { title: 'Catálogo del proveedor | Xitomate' }

export default async function SupplierProductsPage({
  params,
}: {
  params: { supplierId: string }
}) {
  const { supplierId } = await Promise.resolve(params)
  const id = Number(supplierId)

  return (
    <main className="bg-[#FAF5F0] min-h-screen">
      <div className="container mx-auto max-w-6xl py-10 space-y-8">
        <Link
          href="/proveedores"
          className="inline-flex items-center text-sm text-[#E11D48] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver a proveedores
        </Link>

        <SupplierCatalogClient supplierId={id} />
      </div>
    </main>
  )
}