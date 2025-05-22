import type { Meta, StoryObj } from '@storybook/react';
import Etiqueta from './Etiqueta';

const meta: Meta<typeof Etiqueta> = {
  title: 'Components/Etiqueta',
  component: Etiqueta,
  tags: ['autodocs'],
  args: {
    text: 'Hola',
    color: 'default',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'success', 'error', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Etiqueta>;

export const Default: Story = {};
export const Success: Story = {
  args: {
    text: 'Éxito',
    color: 'success',
  },
};
export const Error: Story = {
  args: {
    text: 'Error',
    color: 'error',
  },
};
export const Info: Story = {
  args: {
    text: 'Información',
    color: 'info',
  },
};
