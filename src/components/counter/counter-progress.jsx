"use client";

import {useState, useEffect} from "react";

import {Progress} from '@/components/ui/progress';
import {useStore} from '@/app/store';

export default function CounterProgress () {
  const {count, numOfRows} = useStore();
  const [progress, setProgress] = useState(numOfRows);

  useEffect(() => {
    if (numOfRows > 0) {
      setProgress(count / numOfRows * 100);
    }
  }, [count, numOfRows]);

  return (
    <div className='w-full'>
      {numOfRows > 0 && <Progress value={progress} className="" />}
    </div>
  );
}
