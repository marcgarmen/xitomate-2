import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  args: {
    type: 'noAuth', // Por defecto en modo no autenticado
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['noAuth', 'restaurante', 'proveedor', 'admin'], // orden deseado
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// Orden visual: NoAutenticado, Restaurante, Proveedor, Admin

export const NoAutenticado: Story = {
  args: {
    type: 'noAuth',
  },
};

export const Restaurante: Story = {
  args: {
    type: 'restaurante',
  },
};

export const Proveedor: Story = {
  args: {
    type: 'proveedor',
  },
};

export const Admin: Story = {
  args: {
    type: 'admin',
  },
};
