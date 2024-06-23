"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import {cn} from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root & {color: string}>
>(({className, value, color, ...props}, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-1 w-full overflow-hidden bg-gradient-to-b from-neutral-300 via-transparent to-transparent",
      className
    )}
    {...props}>
    <ProgressPrimitive.Indicator
      className={cn(`bg-${color}`, 'h-full w-full flex-1 transition-all dark:bg-slate-50')}
      style={{transform: `translateX(-${100 - (value || 0)}%)`}} />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export {Progress};
