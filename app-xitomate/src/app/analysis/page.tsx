import DashboardCards from "@/components/analysis/DashboardCards";

export default function AnalysisPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Análisis</h1>
      <div className="grid gap-4">
        <DashboardCards />
      </div>
    </div>
  );
} 