'use client'

import DashboardCards from '@/components/analysis/DashboardCards'
import SalesByDishChart from '@/components/analysis/SalesByDishChart'
import DishSalesForecastTable from '@/components/analysis/DishSalesForecastTable'
import InventoryUsageTable from '@/components/analysis/InventoryUsageTable'
import PurchaseRecommendations from '@/components/analysis/PurchaseRecommendations'
import AlertList from '@/components/analysis/AlertList'
import ProtectedRestaurant from '@/components/ProtectedRestaurant'

export default function AnalysisPage() {
  return (
    <ProtectedRestaurant>
      <main className="min-h-screen bg-[#F2F2F2]">
        <section className="bg-[#E74B6D] text-white py-16 text-center">
          <h1 className="text-4xl font-extrabold mb-2">Análisis de Insumos</h1>
          <p className="text-lg">
            Controla compras, evita desperdicio y mejora tu rentabilidad.
          </p>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
          <DashboardCards />

          <section>
            <h2 className="text-2xl font-bold mb-4">
              Ventas semanales por platillo
            </h2>
            <SalesByDishChart />
          </section>

          <InventoryUsageTable />
          <DishSalesForecastTable />
          <PurchaseRecommendations />
          <AlertList />
        </div>
      </main>
    </ProtectedRestaurant>
  )
}