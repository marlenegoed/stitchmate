import {cn} from '@/lib/utils';
import {ReactNode} from 'react';

export default function SectionLabel({children, className}: {children: ReactNode, className?: string}) {

  return (

    <h3 className={cn('text-sm text-gray-800 mb-2', className)}>
      {children}
    </h3>

  )

}