import type { Meta, StoryObj } from '@storybook/react'
import { AddSaleModal } from './AddSaleModal'

const meta: Meta<typeof AddSaleModal> = {
  title: 'Components/AddSaleModal',
  component: AddSaleModal,
  args: {
    open: true,
    onClose: () => {},
    onSave: () => {},
    dishes: [
      { id: 1, nombre: 'Pizza', precio: 150 },
      { id: 2, nombre: 'Taco', precio: 45 },
    ],
  },
}
export default meta
type Story = StoryObj<typeof AddSaleModal>
export const NewSale: Story = {}