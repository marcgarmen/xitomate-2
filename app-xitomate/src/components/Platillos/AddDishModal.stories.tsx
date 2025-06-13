import type { Meta, StoryObj } from '@storybook/react'
import AddDishModal from './AddDishModal'
import type { Dish } from './types'

const meta: Meta<typeof AddDishModal> = {
  title: 'Components/AddDishModal',
  component: AddDishModal,
  args: {
    open: true,
    onClose: () => {},
    onSave: () => {},
  },
  argTypes: {
    open: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof AddDishModal>

export const NewDish: Story = {}

const sampleDish: Dish = {
  id: 1,
  nombre: 'Taco al pastor',
  precio: 45,
  categoria: 'Tacos',
  ingredientes: [
    { nombreLibre: 'Tortilla', cantidad: 2, unidad: 'piezas' },
    { nombreLibre: 'Carne al pastor', cantidad: 120, unidad: 'kg' },
  ],
}

export const EditDish: Story = {
  args: {
    initialDish: sampleDish,
  },
}