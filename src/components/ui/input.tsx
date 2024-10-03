import * as React from "react";
import {cn} from "@/lib/utils";
import {cva, type VariantProps} from "class-variance-authority";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
  VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  "flex w-full px-2 text-base file:border-0 focus:outline-none file:bg-transparent file:text-base file:font-mediumx placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 text-gray-800",
  {
    variants: {
      variant: {
        default: "rounded-lg font-semibold bg-transparent border border-neutral-300 focus:border-neutral-500",
        noborder: "bg-transparent border-none focus:border-neutral-500",
        background: "bg-neutral-100 m-0 p-0 text-right font-medium",
      },
      size: {
        default: 'h-12',
        sm: 'h-10 min-w-1',
      }
    },
    defaultVariants: {
      variant: "default",
      size: 'default'
    },
  }
);




const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, variant, size, type, ...props}, ref) => {
    return (
      <input
        className={cn(inputVariants({variant, size, className}))}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export {Input};
