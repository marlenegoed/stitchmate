import {cn} from '@/lib/utils'
import {ReactNode} from 'react'

interface FormCardProps {
  children: ReactNode,
  className?: string
}

export function FormCard({children, className}: FormCardProps) {
  return (
    <div className={cn('bg-white rounded p-8 pb-10 gap-6 flex flex-col', className)} >
      {children}
    </div>
  )
}

export function FormCardHeading({children, className}: FormCardProps) {

  return (
    <h3 className={cn('font-semibold text-lg', className)}>{children}</h3>
  )

}