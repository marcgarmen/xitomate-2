import type { Meta, StoryObj } from '@storybook/react';
import SelectionCardRestaurant from '@/components/CardSelection/SelectionCardRestaurant';

const meta: Meta<typeof SelectionCardRestaurant> = {
  title: 'Components/SelectionCardRestaurant',
  component: SelectionCardRestaurant,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SelectionCardRestaurant>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen flex items-center justify-center">
      <SelectionCardRestaurant />
    </div>
  ),
};