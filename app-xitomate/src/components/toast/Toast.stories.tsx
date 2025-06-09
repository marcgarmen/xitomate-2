import type { Meta, StoryObj } from '@storybook/react';
import Toast from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  argTypes: {
    type: { control: 'radio', options: ['success', 'error'] },
    message: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: { type: 'success', message: 'Operación exitosa' },
};

export const Error: Story = {
  args: { type: 'error', message: 'Ocurrió un error' },
};