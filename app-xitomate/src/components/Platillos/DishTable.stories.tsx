import type { Meta, StoryObj } from '@storybook/react'
import DishTable from './DishTable'
import type { Dish } from './types'

const meta: Meta<typeof DishTable> = {
  title: 'Components/DishTable',
  component: DishTable,
  args: {
    dishes: [
      {
        id: 1,
        nombre: 'Ensalada César',
        precio: 89,
        categoria: 'Ensaladas',
        ingredientes: [
          { nombreLibre: 'Lechuga', cantidad: 0.15, unidad: 'kg' },
          { nombreLibre: 'Pollo', cantidad: 120, unidad: 'g' },
        ],
      },
      {
        id: 2,
        nombre: 'Taco al pastor',
        precio: 49,
        categoria: 'Tacos',
        ingredientes: [
          { nombreLibre: 'Tortilla', cantidad: 2, unidad: 'piezas' },
          { nombreLibre: 'Carne al pastor', cantidad: 120, unidad: 'g' },
        ],
      },
    ] as Dish[],
    onEdit: () => {},
    onDelete: () => {},
  },
}
export default meta
type Story = StoryObj<typeof DishTable>

export const Default: Story = {}