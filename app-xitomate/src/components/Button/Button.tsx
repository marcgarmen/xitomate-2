import { Slot } from '@radix-ui/react-slot'
import Image from 'next/image'
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ButtonProps as CustomButtonProps } from './ButtonTypes'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2',
  {
    variants: {
      variant: {
        SignUpRed:
          'bg-[#E11D48] text-white shadow-lg hover:bg-[#c9103b] hover:-translate-y-[1px] active:translate-y-0 focus-visible:ring-[#E11D48]/50',
        SignupGreen:
          'bg-[#5EBD6C] text-white shadow-lg hover:bg-[#49A15A] hover:-translate-y-[1px] active:translate-y-0 focus-visible:ring-[#5EBD6C]/50',
        AccountRed:
          'border border-[#E11D48] bg-[#FDECEF] text-[#E11D48] shadow-lg hover:bg-[#ffd6da] hover:-translate-y-[1px] active:translate-y-0 focus-visible:ring-[#E11D48]/50',
        OutlineGreen:
          'border border-[#5EBD6C] bg-[#E6F7EB] text-[#5EBD6C] shadow-lg hover:bg-[#d4f1dc] hover:-translate-y-[1px] active:translate-y-0 focus-visible:ring-[#5EBD6C]/50',
      },
      size: {
        default: 'h-10 px-6 text-sm',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-8 text-base',
        icon: 'size-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'SignUpRed',
      size: 'default',
    },
  }
)

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
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props}>
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
  )
}

export { Button, buttonVariants }