import type { Meta, StoryObj } from '@storybook/react';
import { SalesTable } from './SalesTable';
import type { Sale } from './types';

const meta: Meta<typeof SalesTable> = {
  component: SalesTable,
  title: 'Sales/SalesTable',
};
export default meta;

export const Default: StoryObj<typeof SalesTable> = {
  args: {
    sales: [
      {
        id: 1,
        dish: 'Huevos rancheros',
        quantity: 3,
        unitPrice: 45,
        date: new Date(),
      } as Sale,
    ],
    onEdit: () => {},
    onDelete: () => {},
  },
};