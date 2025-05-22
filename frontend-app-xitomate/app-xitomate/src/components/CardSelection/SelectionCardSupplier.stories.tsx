import type { Meta, StoryObj } from '@storybook/react';
import SelectionCardSupplier from '@/components/CardSelection/SelectionCardSupplier';

const meta: Meta<typeof SelectionCardSupplier> = {
  title: 'Components/SelectionCardSupplier',
  component: SelectionCardSupplier,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SelectionCardSupplier>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen flex items-center justify-center">
      <SelectionCardSupplier />
    </div>
  ),
};