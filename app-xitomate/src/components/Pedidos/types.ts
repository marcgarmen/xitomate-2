export interface OrderItem {
  productName: string
  quantity: number
  unit: "kg" | "piezas" | "otro"
  price: number
}

export interface Pedido {
  id: number
  restaurantName: string
  items: OrderItem[]
  total: number
  status?: "pendiente" | "aceptado" | "rechazado"
}