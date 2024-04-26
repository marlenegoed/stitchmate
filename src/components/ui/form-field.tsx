
import * as React from "react";
import {cn} from "@/lib/utils";

interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

export default function FormField ({children, className}:FormFieldProps) {

  return (
    <div className={cn('flex items-center bg-sand rounded-lg px-3 min-h-12', className)} >
      {children}
    </div>
  );
}