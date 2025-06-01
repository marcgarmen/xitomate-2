import SupplierCard from '@/components/suppliers/SupplierCard'
import { SUPPLIERS } from '@/components/suppliers/constants'

export const metadata = { title: 'Proveedores | Xitomate' }

export default function SuppliersPage() {
  return (
    <main className="bg-[#F9FBF6] min-h-screen">
      <section
        className="relative h-48 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-suppliers.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#9BB968]/70 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">
            Conecta con proveedores locales
          </h1>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl py-10 space-y-6">
        <p className="text-gray-700">
          Explora productores cercanos, revisa su cobertura y descubre sus mejores insumos.
        </p>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {SUPPLIERS.map(s => (
            <SupplierCard key={s.id} supplier={s} />
          ))}
        </div>
      </div>
    </main>
  )
}