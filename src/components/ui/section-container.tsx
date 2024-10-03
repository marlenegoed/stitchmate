import {cn} from '@/lib/utils';
import {ReactNode} from 'react';

export default function SectionContainer({children, className}: {children: ReactNode, className?: string}) {

  return (
    <section className={cn('w-full bg-white rounded-lg p-3', className)}>
      {children}
    </section>
  )
}