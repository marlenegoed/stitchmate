"use client";

import {useState, useEffect} from "react";
import {Progress} from '@/components/ui/progress';
import {useCounterStore} from '@/providers/counter-store-provider';
import clsx from 'clsx';
import {cn} from '@/lib/utils';


interface SectionProgressProps {
  numOfRows: number,
  className?: string,
}

export default function SectionProgress({numOfRows, className}: SectionProgressProps) {
  const count = useCounterStore(state => state.storeCount)

  const [progress, setProgress] = useState(numOfRows);

  const isNumOfRows = numOfRows > 0

  useEffect(() => {
    if (numOfRows > 0) {
      setProgress(Math.min(count / numOfRows * 100, 100));
    } else {
      setProgress(0);
    }
  }, [numOfRows, count]);

  return (
    <>
      <Progress value={progress} className={clsx('w-full min-h-1', {'invisible': !isNumOfRows})} />
      <div className={cn('flex flex-col items-end w-full px-6 pt-4 select-none', className)}>
        <span className={clsx('font-semibold bg-white text-slate-700 rounded-full shadow-sm px-4 py-1', {'invisible': !isNumOfRows})}>
          {numOfRows}
        </span>
      </div>
    </>
  );
}
