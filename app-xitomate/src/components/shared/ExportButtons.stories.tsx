import type { Meta, StoryObj } from '@storybook/react';
import ExportButtons from './ExportButtons';

const meta: Meta<typeof ExportButtons> = {
  title: 'Shared/ExportButtons',
  component: ExportButtons,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof ExportButtons>;

export const Default: Story = {};