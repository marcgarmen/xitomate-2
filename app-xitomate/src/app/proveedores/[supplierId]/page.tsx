import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProductCard from '@/components/suppliers/ProductCard'
import { SUPPLIERS, PRODUCTS } from '@/components/suppliers/constants'

interface Props {
  params: { supplierId: string }
}

export async function generateStaticParams() {
  return SUPPLIERS.map(s => ({ supplierId: s.id }))
}

export const metadata = { title: 'Productos del proveedor | Xitomate' }

export default async function SupplierProductsPage({ params }: Props) {
  const { supplierId } = await Promise.resolve(params)

  const supplier = SUPPLIERS.find(s => s.id === supplierId)
  if (!supplier) notFound()

  const products = PRODUCTS[supplierId] ?? []

  return (
    <main className="bg-[#FAF5F0] min-h-screen">
      <div className="container mx-auto max-w-5xl py-10 space-y-8">
        <Link
          href="/proveedores"
          className="inline-flex items-center text-sm text-[#E11D48] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver a proveedores
        </Link>

        <section>
          <h1 className="text-3xl font-bold mb-1">{supplier.name}</h1>
          <p className="text-gray-700">{supplier.coverage}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Productos ofrecidos</h2>
          {products.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Este proveedor aún no ha publicado productos.
            </p>
          )}
        </section>
      </div>
    </main>
  )
}