'use client';

import { Button } from '@/components/Button/Button';
import DashboardCards from '@/components/analysis/DashboardCards';
import PrediccionGrafica from '@/components/analysis/PrediccionGrafica';
import InventoryUsageTable from '@/components/analysis/InventoryUsageTable';
import PurchaseRecommendations from '@/components/analysis/PurchaseRecommendations';
import AlertList from '@/components/analysis/AlertList';

export default function AnalysisPage() {
  return (
    <main className="bg-[#FAF5F0] min-h-screen">
      <div className="container mx-auto max-w-6xl py-10 space-y-10">
        <section>
          <h1 className="text-3xl font-bold mb-2">Análisis inteligente de insumos</h1>
          <p className="text-gray-700">
            Toma decisiones con base en datos: controla tus compras, evita desperdicio y mejora tu rentabilidad.
          </p>
        </section>

        <DashboardCards />

        <PrediccionGrafica />

        <InventoryUsageTable />

        <PurchaseRecommendations />

        <AlertList />
      </div>
    </main>
  );
}