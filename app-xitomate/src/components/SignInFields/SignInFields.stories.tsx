import type { Meta, StoryObj } from '@storybook/react'
import { SignInFields } from './SignInFields'

const meta: Meta<typeof SignInFields> = {
  title: 'Components/SignInFields',
  component: SignInFields,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SignInFields>

export const Default: Story = {}