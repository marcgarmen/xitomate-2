import type { Meta, StoryObj } from '@storybook/react';
import SelectionCardGroup from '@/components/CardSelection/SelectionCardGroup';

const meta: Meta<typeof SelectionCardGroup> = {
  title: 'Components/SelectionCardGroup',
  component: SelectionCardGroup,
};

export default meta;

type Story = StoryObj<typeof SelectionCardGroup>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen flex items-center justify-center">
      <SelectionCardGroup />
    </div>
  ),
};