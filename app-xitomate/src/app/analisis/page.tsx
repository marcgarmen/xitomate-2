"use client";

import DashboardCards from "@/components/analysis/DashboardCards";
import SalesByDishChart from "@/components/analysis/SalesByDishChart";
import DishSalesForecastTable from '@/components/analysis/DishSalesForecastTable';
import InventoryUsageTable from "@/components/analysis/InventoryUsageTable";
import PurchaseRecommendations from "@/components/analysis/PurchaseRecommendations";
import AlertList from "@/components/analysis/AlertList";
import ProtectedRestaurant from "@/components/ProtectedRestaurant";

export default function AnalysisPage() {
  return (
    <ProtectedRestaurant>
      <main className="bg-[#FAF5F0] min-h-screen">
        <div className="container mx-auto max-w-6xl py-10 space-y-10">
          <section>
            <h1 className="text-3xl font-bold mb-2">
              Análisis inteligente de insumos
            </h1>
            <p className="text-gray-700">
              Toma decisiones con base en datos: controla tus compras, evita
              desperdicio y mejora tu rentabilidad.
            </p>
          </section>

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
  );
}