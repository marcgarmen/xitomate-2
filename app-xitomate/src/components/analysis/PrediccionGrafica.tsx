'use client';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PrediccionGrafica() {
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch('/restaurant/analysis/sales-forecast', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setForecast(data.forecast || []);
        }
      } catch (err) {
        setError('Error al cargar el pronóstico');
      }
    };

    fetchForecast();
  }, []);

  const chartData = {
    labels: forecast.map(f => f.date),
    datasets: [
      {
        label: 'Ventas Pronosticadas',
        data: forecast.map(f => f.forecast),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Ventas Reales',
        data: forecast.map(f => f.actual),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Pronóstico de Ventas'
      }
    }
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <Line data={chartData} options={options} />
    </div>
  );
}