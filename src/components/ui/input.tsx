import * as React from "react";
import {cn} from "@/lib/utils";
import {cva, type VariantProps} from "class-variance-authority";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  "flex h-12 w-full px-2 text-base file:border-0 focus:outline-none  file:bg-transparent file:text-base file:font-mediumx placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "rounded-lg font-semibold bg-transparent border focus:border-neutral-500 border-neutral-300 text-base text-gray-800 placeholder:text-neutral-400",
        inline:
          "bg-inherit border-none focus:outline-none",
        form: "font-semibold bg-transparent rounded-lg text-base px-5 h-12 text-gray-800",
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
