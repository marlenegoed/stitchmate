import * as React from "react";
import {cn} from "@/lib/utils";
import {cva, type VariantProps} from "class-variance-authority";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  "flex h-12 w-full  px-3 py-2 text-base file:border-0 focus:outline-none focus:border-neutral-500 file:bg-transparent file:text-base file:font-mediumx placeholder:text-neutral-400 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "rounded-lg border border-input border-dashed font-semibold bg-transparent border-neutral-400 text-base px-5 h-14 text-gray-800 placeholder:text-neutral-500 focus:border-neutral-500",
        inline:
          "bg-inherit border-none focus:outline-none",
        form: "font-semibold bg-transparent rounded-lg border border-neutral-400 text-base px-5 h-14 text-gray-800 placeholder:text-neutral-500 focus:border-neutral-400",
        borderbottom: "border-b border-dashed border-neutral-400 pl-0"
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
        className={cn(inputVariants({variant}), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export {Input};
