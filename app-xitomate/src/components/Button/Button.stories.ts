import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    variant: 'SignUpRed',
    size: 'default',
    children: 'Button',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['SignUpRed', 'AccountRed', 'SignupGreen', 'OutlineGreen'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const SignUpRed: Story = {
  args: { variant: 'SignUpRed', children: 'Registro' },
}

export const SignupGreen: Story = {
  args: { variant: 'SignupGreen', children: 'Nuevo platillo' },
}

export const AccountRed: Story = {
  args: { variant: 'AccountRed', children: 'Mi cuenta' },
}

export const OutlineGreen: Story = {
  args: { variant: 'OutlineGreen', children: 'Agregar' },
}