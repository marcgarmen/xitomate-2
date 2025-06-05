export async function createSale(saleData: {
  metodoPago: string;
  items: Array<{
    dishId: number;
    cantidad: number;
  }>;
}) {
  const response = await fetch('/api/restaurant/sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(saleData),
  });

  if (!response.ok) {
    throw new Error('Failed to create sale');
  }

  return response.json();
} 