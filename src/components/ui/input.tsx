import * as React from "react";

import {cn} from "@/lib/utils";

import {cva} from "class-variance-authority";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'inline';
  }

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        inline:
          "bg-inherit border-none focus:outline-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({variant, className}))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input