import type { Meta, StoryObj } from '@storybook/react';
import AddDishModal from './AddDishModal';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof AddDishModal> = {
  title: 'Platillos/AddDishModal',
  component: AddDishModal,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof AddDishModal>;

export const Default: Story = {
  args: {
    onSave: action('onSave'),
    onClose: action('onClose'),
  },
};