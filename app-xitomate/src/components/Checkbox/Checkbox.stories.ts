import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import Image from 'next/image';


const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional classes for styling the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    className: '',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};