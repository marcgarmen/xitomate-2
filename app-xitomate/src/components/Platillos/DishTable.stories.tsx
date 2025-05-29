import type { Meta, StoryObj } from '@storybook/react';
import DishTable from './DishTable';

const meta: Meta<typeof DishTable> = {
  title: 'Platillos/DishTable',
  component: DishTable,
};
export default meta;
type Story = StoryObj<typeof DishTable>;

export const OneDish: Story = {
  args: {
    dishes: [
      {
        name: 'Huevos a la mexicana',
        ingredients: [
          { name: 'Huevos', quantity: 4 },
          { name: 'Tomate', quantity: 1 },
          { name: 'Cebolla', quantity: 2 },
        ],
      },
    ],
  },
};