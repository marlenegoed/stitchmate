import {useEffect, useState} from 'react';

export function useRandom(max: number, initial = 0) {
  const [randomIndex, setRandomIndex] = useState(initial);

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * max));
  }, [max]);

  return randomIndex
}