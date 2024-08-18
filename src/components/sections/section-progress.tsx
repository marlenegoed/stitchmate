"use client";

import {useState, useEffect} from "react";
import {Progress} from '@/components/ui/progress';
import {useCounterStore} from '@/providers/counter-store-provider';


interface SectionProgressProps {
  numOfRows: number,
  color: string,
}

export default function SectionProgress({numOfRows, color}: SectionProgressProps) {

  const count = useCounterStore(state => state.storeCount)
  const [progress, setProgress] = useState(numOfRows);

  useEffect(() => {
    if (numOfRows > 0) {
      setProgress(Math.min(count / numOfRows * 100, 100));
    } else {
      setProgress(0);
    }
  }, [numOfRows, count]);

  return (
    <Progress value={progress} className='w-full min-h-1' color={color} />
  );
}
