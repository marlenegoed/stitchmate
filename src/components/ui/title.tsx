
import {cn} from "@/lib/utils";
import {cva, type VariantProps} from "class-variance-authority";
import {type ReactNode, forwardRef} from 'react';

const titleVariants = cva(
  'font-semibold text-slate-800 text-xl',
  {
    variants: {
      variant: {
        default: 'text-left',
        center: 'text-xl text-center',
      }
    },
    defaultVariants: {
      variant: 'default',
    }
  }
);

type TitleVariants = VariantProps<typeof titleVariants>

interface TitleProps extends TitleVariants {
  className?: string,
  children: ReactNode,
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({className, variant, children}, ref) => {
    return (
      <h2
        className={cn(titleVariants({variant, className}))}
        ref={ref}
      >
        {children}
      </h2>
    );
  });
Title.displayName = "Title";


export default Title;