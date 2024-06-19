import {cn} from '@/lib/utils';
import clsx from 'clsx';

interface NumOfRowsProps {
  className?: string,
  numOfRows?: number,
}

export default function NumOfRows({className, numOfRows}: NumOfRowsProps) {

  return (
    <div className={cn('flex select-none', className)}>
      <span className={clsx('font-semibold text-black/40 border border-black/30 rounded-full px-4 py-1', {'invisible': !numOfRows})}>
        {numOfRows} rows
      </span>
    </div>
  )
}