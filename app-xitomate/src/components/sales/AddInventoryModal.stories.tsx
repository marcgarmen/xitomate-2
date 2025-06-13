import type { Meta, StoryObj } from '@storybook/react'
import { AddInventoryModal } from './AddInventoryModal'

const meta: Meta<typeof AddInventoryModal> = {
  title: 'Components/AddInventoryModal',
  component: AddInventoryModal,
  args: {
    open: true,
    onClose: () => {},
    onSave: () => {},
  },
}
export default meta
type Story = StoryObj<typeof AddInventoryModal>
export const NewInventory: Story = {}