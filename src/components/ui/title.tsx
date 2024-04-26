import { useStore } from '@/app/store'; 
import { cn } from '@/lib/utils'; 
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, ForwardedRef, ReactNode } from 'react';


const inputVariants = cva(
  'font-semibold text-slate-800 text-xl',
  {
    variants: {
      variant: {
        default: 'text-left',
        center: 'text-xl text-center',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);


interface TitleProps extends VariantProps<typeof inputVariants> {
  className?: string; 
  children: ReactNode; 
}


const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, variant, children }, ref) => {
    return (
      <h2
        className={cn(inputVariants({ variant, className }))}
        ref={ref} 
      >
        {children}
      </h2>
    );
  }
);

Title.displayName = 'Title'; 


interface CounterTitleProps {
  className?: string; 
}


export function CounterTitle({ className }: CounterTitleProps) {
  const { title } = useStore(); 
  return (
    <Title variant="center" className={className}>
      {title}
    </Title>
  );
}

export {Title};
