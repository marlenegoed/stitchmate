import * as React from "react";

import {cn} from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({className, ...props}, ref) => {
  return (
    (<textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-lg bg-sand px-3 py-3 text-base text-slate-800 focus-visible:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 placeholder:text-neutral-500",
        className
      )}
      ref={ref}
      {...props} />)
  );
});
Textarea.displayName = "Textarea";

export {Textarea};
