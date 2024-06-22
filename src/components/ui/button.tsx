import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center text-base justify-center whitespace-nowrap rounded-lg font-semibold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "font-medium bg-transparent text-gray-900 border border-gray-800 hover:border-neutral-500 hover:text-neutral-600 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        secondary:
          "bg-sienna-400/80 text-white hover:bg-sienna-400/70 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost: "hover:opacity-80 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
        nohover: "hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "min-w-12 h-12 p-5",
        sm: "h-6 text-xs px-2 hover:bg-current rounded-full",
        lg: "min-w-32 h-14 rounded-full px-8 text-xl",
        icon: "h-10 w-10",
      },
      weight: {
        default: "",
        bold: "font-semibold"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "default"
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({className, variant, size, weight, asChild = false, ...props}, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    (<Comp
      className={cn(buttonVariants({variant, size, weight, className}))}
      ref={ref}
      {...props} />)
  );
});
Button.displayName = "Button";

export {Button, buttonVariants};
