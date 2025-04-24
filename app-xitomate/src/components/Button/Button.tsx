import { ButtonProps as CustomButtonProps } from './ButtonTypes';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Settings } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  {
    variants: {
      variant: {
        SignUpRed:
          'border-2 border-red-500 text-red-500 bg-transparent hover:bg-red-100 focus-visible:ring-red-300 shadow-md px-6 py-2 rounded-full',
        SignupGreen:
          'bg-green-500 text-black rounded-full px-6 py-2 shadow-md hover:bg-green-600 focus-visible:ring-green-300',
        AccountRed:
          'border-2 border-red-500 text-red-500 bg-transparent hover:bg-red-100 focus-visible:ring-red-300 shadow-md px-6 py-2 rounded-full', // Similar to SignUpRed
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'SignUpRed',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> &
  CustomButtonProps & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {variant === 'AccountRed' && <Settings className="mr-2 h-5 w-5" />} {/* Add the settings icon */}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };