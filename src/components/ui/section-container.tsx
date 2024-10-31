import {cn} from '@/lib/utils';
import {ReactNode} from 'react';
import { HiChevronUp } from "react-icons/hi2";

export default function SectionContainer({icon, title, className, children,}: {icon?: ReactNode, children: ReactNode, className?: string, title?: string}) {

  return (
    <section className={cn('w-full bg-white rounded-lg p-6 pt-5 flex flex-col', className)}>
      {/* <SectionHeader icon={icon} title={title} /> */}
      {children}
    </section>
  )
}

export function SectionHeader ({icon, title} : {icon?:ReactNode, title?:string}) {
  return (
      <div className='flex flex-row items-end justify-between w-full'>
        <span className='text-lg font-semibold'>{title}</span>
        {icon}
      </div>
  )


} 