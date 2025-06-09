import DashboardCards from "@/components/analysis/DashboardCards";
import { TestDataUploader } from "@/components/analysis/TestDataUploader";

export default function AnalysisPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Análisis</h1>
      <div className="grid gap-4">
        <TestDataUploader />
        <DashboardCards />
      </div>
    </div>
  );
} 