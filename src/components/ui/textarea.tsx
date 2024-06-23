import * as React from "react";

import {cn} from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({className, ...props}, ref) => {
  return (
    (<textarea
      className={cn(
        "bg-transparent border border-dashed border-neutral-400 flex min-h-[80px] w-full rounded-lg placeholder:text-neutral-400 px-3 py-3 text-base font-medium text-gray-800 focus-visible:outline-none focus:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-neutral-500 dark:focus-visible:ring-slate-300",
        className
      )}
      ref={ref}
      {...props} />)
  );
});
Textarea.displayName = "Textarea";

export {Textarea};
