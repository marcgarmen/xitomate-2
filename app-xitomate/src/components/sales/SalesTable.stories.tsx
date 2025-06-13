import type { Meta, StoryObj } from '@storybook/react'
import { SalesTable } from './SalesTable'
import type { Sale } from './types'

const meta: Meta<typeof SalesTable> = {
  title: 'Components/SalesTable',
  component: SalesTable,
  args: {
    sales: [
      {
        id: 1,
        dishId: 1,
        dishName: 'Taco al pastor',
        quantity: 3,
        unitPrice: 45,
        metodoPago: 'CASH',
        date: new Date(),
      },
    ] as Sale[],
    onEdit: () => {},
    onDelete: () => {},
  },
}
export default meta
type Story = StoryObj<typeof SalesTable>
export const Default: Story = {}