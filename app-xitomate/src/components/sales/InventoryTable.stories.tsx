import type { Meta, StoryObj } from '@storybook/react';
import { InventoryTable } from './InventoryTable';
import type { InventoryItem } from './types';

const meta: Meta<typeof InventoryTable> = {
  component: InventoryTable,
  title: 'Sales/InventoryTable',
};
export default meta;

export const Default: StoryObj<typeof InventoryTable> = {
  args: {
    items: [
      {
        id: 1,
        name: 'Huevos',
        stock: 12,
        unit: 'pzas',
        updatedAt: new Date(),
      } as InventoryItem,
    ],
    onEdit: () => {},
    onDelete: () => {},
  },
};