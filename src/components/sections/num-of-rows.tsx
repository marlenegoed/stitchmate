import {cn} from '@/lib/utils';
import clsx from 'clsx';

interface NumOfRowsProps {
  className?: string,
  numOfRows: number,
}

export default function NumOfRows({className, numOfRows}: NumOfRowsProps) {

  return (
    <div className={cn('flex select-none whitespace-nowrap', className)}>
      <span className={clsx('text-neutral-500 border border-neutral-400 rounded-full px-4 py-1 sm:text-base text-sm h-fit', {'invisible': numOfRows === 0})}>
        {numOfRows} rows
      </span>
    </div>
  )
}