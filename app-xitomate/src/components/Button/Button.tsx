import { ButtonProps as CustomButtonProps } from './ButtonTypes';
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        
        outlinedRed:
          "border-2 border-red-500 text-black-500 bg-transparent hover:bg-red-100 focus-visible:ring-red-300",
          outlinedGreen:
          "border-2 border-green-500 text-black-500 bg-transparent hover:bg-green-100 focus-visible:ring-green-300",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },

  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  buttonType, // Usamos 'buttonType' en lugar de 'type'
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> &
  CustomButtonProps & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {buttonType} {/* Puedes usar 'buttonType' si es necesario */}
    </Comp>
  );
}

export { Button, buttonVariants };