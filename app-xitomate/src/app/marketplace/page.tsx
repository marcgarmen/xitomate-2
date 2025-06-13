import SuppliersClient from "@/components/suppliers/SuppliersClient"
import ProtectedRestaurant from "@/components/ProtectedRestaurant"

export const metadata = { title: "Marketplace | Xitomate" }

export default function MarketplacePage() {
  return (
    <ProtectedRestaurant>
      <main className="bg-[#F9FBF6] min-h-screen">
        <section className="h-56 md:h-64 lg:h-72 bg-gradient-to-b from-[#5EBD6C]/60 to-black/40 flex flex-col items-center justify-center px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md text-center">
            Conecta con proveedores locales
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl text-center">
            Explora productores cercanos, revisa su cobertura y descubre sus mejores insumos
          </p>
        </section>

        <div className="container mx-auto max-w-6xl py-12">
          <SuppliersClient />
        </div>
      </main>
    </ProtectedRestaurant>
  )
}