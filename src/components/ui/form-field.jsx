
import {cn} from "@/lib/utils";

export default function FormField ({children, className}) {

  return (
    <div className={cn('flex items-center bg-neutral-100 rounded-xl px-3 min-h-12', className)} >
      {children}
    </div>
  );
}