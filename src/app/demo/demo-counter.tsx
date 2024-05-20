'use client'

import BackgroundBlob from '@/components/ui/background-blobs';
import {useDemoStore} from '@/providers/demo-store-provider';
import {useState, useMemo} from 'react';
import useSound from 'use-sound';

export default function DemoCounter() {
  const colors = ['eggshell', 'champagne', 'olivine', 'orchid', 'flax', 'jordy', 'tangerine', 'caramel']
  const [randomColor] = useState(colors[Math.floor(Math.random() * colors.length)])


  const blob = useMemo(() => <BackgroundBlob className={`fill-${randomColor} absolute top-0 left-0`} stroke={true} />, [randomColor]);
  const [play] = useSound('/click-2.mp3', );

  const {storeCount, countStoreUp, sound} = useDemoStore(
    (state) => state,
  )

  async function handleClick() {
    countStoreUp()
    if (sound) play()
  }

  return (
    <div className='relative flex items-center justify-center'>
      <button className='text-8xl text-center z-10 relative text-zinc-800 p-16' onClick={handleClick}>
        <span>{storeCount}</span>
      </button>
      {blob}
    </div>
  );
}