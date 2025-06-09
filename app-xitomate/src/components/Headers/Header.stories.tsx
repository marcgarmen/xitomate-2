import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import type { HeaderProps } from './Header.types';
import { AuthContext, AuthCtx } from '@/context/AuthContext';

// @ts-ignore
import { AppRouterContext } from 'next/dist/client/components/app-router-context';

const mockRouter = {
  pathname: '/',
  push: async () => {},
  replace: async () => {},
  prefetch: async () => {},
  back: () => {},
  forward: () => {},
  refresh: () => {},
  events: { on: () => {}, off: () => {}, emit: () => {} },
};

const authMock: AuthCtx = {
  role: 'noAuth',
  ready: true,
  login: () => {},
  logout: () => {},
};

const meta: Meta<HeaderProps> = {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <AppRouterContext.Provider value={mockRouter as any}>
        <AuthContext.Provider value={authMock}>
          <Story />
        </AuthContext.Provider>
      </AppRouterContext.Provider>
    ),
  ],
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['noAuth', 'restaurante', 'proveedor', 'admin'] as const,
    },
  },
};

export default meta;
type Story = StoryObj<HeaderProps>;

export const NoAuth: Story = { args: { type: 'noAuth' } };
export const Restaurante: Story = { args: { type: 'restaurante' } };
export const Proveedor: Story = { args: { type: 'proveedor' } };
export const Admin: Story = { args: { type: 'admin' } };