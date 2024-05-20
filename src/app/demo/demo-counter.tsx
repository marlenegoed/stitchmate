'use client'

import {BlobCounter} from '@/components/ui/blob-counter';
import {useRandom} from '@/lib/use-random';
import {useDemoStore} from '@/providers/demo-store-provider';
import {useState} from 'react';

export default function DemoCounter() {
  const colors = ['eggshell', 'champagne', 'olivine', 'orchid', 'flax', 'jordy', 'tangerine', 'caramel']
  const [randomColor] = useState(colors[Math.floor(Math.random() * colors.length)])

  const blobIndex = useRandom(8)

  const {storeCount, countStoreUp, sound} = useDemoStore(
    (state) => state,
  )

  function handleClick() {
    countStoreUp()
  }

  return <BlobCounter count={storeCount} onClick={handleClick} color={randomColor} blobIndex={blobIndex} sound={sound} />
}