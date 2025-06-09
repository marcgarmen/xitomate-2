import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SupplierCatalogClient from "@/components/suppliers/SupplierCatalogClient";
import ProtectedRestaurant from "@/components/ProtectedRestaurant";

export const metadata = { title: "Catálogo del proveedor | Xitomate" };

export default function SupplierProductsPage({
  params,
}: {
  params: { supplierId: string };
}) {
  const id = Number(params.supplierId);

  return (
    <ProtectedRestaurant>
      <main className="bg-[#FAF5F0] min-h-screen">
        <div className="container mx-auto max-w-6xl py-10">
          <Link
            href="/marketplace"
            className="mb-4 inline-flex items-center text-sm text-[#E11D48] hover:underline"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Volver al marketplace
          </Link>

          <SupplierCatalogClient supplierId={id} />
        </div>
      </main>
    </ProtectedRestaurant>
  );
}