import { ButtonProps as CustomButtonProps } from './ButtonTypes';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Settings } from 'lucide-react';

import { cn } from '@/lib/utils';
import Image from 'next/image';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  {
    variants: {
      variant: {
        // Botón rojo contorno (registro / cancelar)
        SignUpRed:
          'border-2 border-[#F45E62] text-[#F45E62] bg-transparent hover:bg-[#F45E62]/10 focus-visible:ring-[#F45E62]/50 shadow-md px-6 py-2 rounded-full',

        // Botón verde sólido
        SignupGreen:
          'bg-[#A1C374] text-black rounded-full px-6 py-2 shadow-md hover:bg-[#A1C374]/90 focus-visible:ring-[#A1C374]/50',

        // Botón rojo contorno + ícono (Mi cuenta)
        AccountRed:
          'border-2 border-[#F45E62] text-[#F45E62] bg-transparent hover:bg-[#F45E62]/10 focus-visible:ring-[#F45E62]/50 shadow-md px-6 py-2 rounded-full',

        // botón verde contorno
        OutlineGreen:
          'border-2 border-[#A1C374] text-[#A1C374] bg-transparent hover:bg-[#A1C374]/10 focus-visible:ring-[#A1C374]/50 shadow-md px-6 py-2 rounded-full',
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
      {variant === 'AccountRed' && (
        <Image
          src="/iconaccountred.svg"
          alt="Account Icon"
          width={20}
          height={20}
          className="mr-2"
        />
      )}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };