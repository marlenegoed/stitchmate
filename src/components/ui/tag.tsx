import {cn} from '@/lib/utils';
import {ReactNode} from 'react';

export default function Tag({children, className}: {children: ReactNode, className ?: string}) {

  return (
    <span className={cn('bg-sienna-100 text-sienna-400 h-6 text-xs px-2 rounded-full flex items-center', className)}>
      {children}
    </span>
  )
}