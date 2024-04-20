"use client";

import {useState, useEffect} from "react";

import {Progress} from '@/components/ui/progress';
import Rows from '@/components/ui/rows';

import {useStore} from '@/app/store';

export default function CounterProgress () {

  const [progress, setProgress] = useState(13);

  const {count, numOfRows} = useStore();

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   setRepeatValue3(count);
  // }, [count]);

  return (
    <div>
      <Progress value={progress} className="w-full" />
      <Rows />
    </div>
  );
}
