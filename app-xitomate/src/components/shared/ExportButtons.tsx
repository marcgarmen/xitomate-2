'use client';

import { Button } from '@/components/Button/Button';

export default function ExportButtons() {
  return (
    <div className="flex gap-4 mb-4">
      <Button variant="OutlineGreen">Exportar PDF</Button>
      <Button variant="OutlineGreen">Exportar CSV</Button>
    </div>
  );
}