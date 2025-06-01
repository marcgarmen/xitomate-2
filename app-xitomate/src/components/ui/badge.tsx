'use client';
import { cn } from '@/lib/utils';
import React from 'react';

type Variant = 'default' | 'success' | 'warning' | 'error';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const base =
    'inline-block px-2 py-[2px] rounded-full text-xs font-semibold select-none';

  const palette: Record<Variant, string> = {
    default: 'bg-gray-200 text-gray-800',
    success: 'bg-green-200 text-green-800',
    warning: 'bg-yellow-200 text-yellow-900',
    error:   'bg-red-200 text-red-800',
  };

  return (
    <span className={cn(base, palette[variant], className)} {...props}>
      {children}
    </span>
  );
}