import type { Meta, StoryObj } from '@storybook/react';
import SelectionCard from './SelectionCard'; // Corrected import path

const meta: Meta<typeof SelectionCard> = {
  title: 'Components/SelectionCard',
  component: SelectionCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SelectionCard>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen flex items-center justify-center">
      <SelectionCard />
    </div>
  ),
};