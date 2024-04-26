
import * as React from "react";
import {cn} from "@/lib/utils";

interface FormFieldProps {
}

const FormField:FormFieldProps = ({children, className}) => {

  return (
    <div className={cn('flex items-center bg-sand rounded-lg px-3 min-h-12', className)} >
      {children}
    </div>
  );
}

export { FormField }