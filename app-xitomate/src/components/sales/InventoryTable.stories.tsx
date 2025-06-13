import type { Meta, StoryObj } from '@storybook/react'
import { InventoryTable } from './InventoryTable'
import type { InventoryItem } from './types'

const meta: Meta<typeof InventoryTable> = {
  title: 'Components/InventoryTable',
  component: InventoryTable,
  args: {
    items: [
      {
        id: 1,
        name: 'Harina',
        stock: 2,
        unit: 'kg',
        updatedAt: new Date(),
      },
    ] as InventoryItem[],
    onEdit: () => {},
    onDelete: () => {},
  },
}
export default meta
type Story = StoryObj<typeof InventoryTable>
export const Default: Story = {}