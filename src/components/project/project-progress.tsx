"use client";

import {useState, useEffect} from "react";
import {Progress} from '@/components/ui/progress';
import {cn} from '@/lib/utils';

interface ProjectProgressProps {
  count: number,
  numOfRows: number
  className?: string
}

export default function ProjectProgress({count, numOfRows, className}: ProjectProgressProps) {

  const [progress, setProgress] = useState(numOfRows);

  useEffect(() => {
    if (numOfRows > 0) {
      setProgress(Math.min(count / numOfRows * 100, 100));
    } else {
      setProgress(0);
    }
  }, [numOfRows, count]);

  return (
    <Progress value={progress} className={cn('w-full', className)} />

  );
}
