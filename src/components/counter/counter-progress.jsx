"use client";

import {useState, useEffect} from "react";
import {Progress} from '@/components/ui/progress';
import {useStore} from '@/app/store';

export default function CounterProgress () {
  const {count, numOfRows} = useStore();
  const [progress, setProgress] = useState(numOfRows);

  useEffect(() => {
    if (numOfRows > 0) {
      setProgress(Math.min(count / numOfRows * 100, 100));
    } else {
      setProgress(0);
    }
  }, [numOfRows, count]);

  return (
    <div className='w-full'>
      <Progress value={progress} className="" />
    </div>
  );
}
