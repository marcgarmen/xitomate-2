import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    variant: 'SignUpRed', // Default variant
    size: 'default', // Default size
    children: 'Button', // Default button text
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['SignUpRed', 'SignupGreen'], // Available variants
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'], // Available sizes
    },
    children: {
      control: 'text',
      description: 'Text inside the button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const SignUpRed: Story = {
  args: {
    variant: 'SignUpRed',
    children: 'Sign Up Red Button',
  },
};

export const SignupGreen: Story = {
  args: {
    variant: 'SignupGreen',
    children: 'Sign Up Green Button',
  },
};