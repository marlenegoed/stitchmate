import * as React from "react";
import {cn} from "@/lib/utils";
import {cva, type VariantProps} from "class-variance-authority";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  "flex h-12 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-neutral-500 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        inline:
          "bg-inherit border-none focus:outline-none",
        form: "rounded-lg bg-white text-md outline-sienna-300 border-none px-5 h-14",
        noring: "focus:outline-none focus:bg-neutral-200 hover:bg-neutral-200 transition-colors"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);




const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, variant, type, ...props}, ref) => {
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

export {Input};
