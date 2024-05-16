"use client";

import {useState, useEffect} from "react";
import {Progress} from '@/components/ui/progress';
import {useCounterStore} from '@/providers/counter-store-provider';
import clsx from 'clsx';


interface SectionProgressProps {
  numOfSections: number,
  position: number, 
  numOfRows: number, 
}

export default function SectionProgress({numOfSections, position, numOfRows}: SectionProgressProps) {

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
      <Progress value={progress} className={clsx('w-full', {'invisible': !isNumOfRows})} />
      <div className='flex flex-col items-end w-full px-6 pt-2'>
        <span className='font-semibold text-xl text-neutral-300'>{position} / {numOfSections}</span>
        <span className={clsx('font-semibold text-xl text-neutral-300 mt-1', {'invisible': !isNumOfRows})}>{numOfRows}</span>
      </div>
    </>
  );
}
