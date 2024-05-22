'use client'

import useSound from 'use-sound';
import BackgroundBlob from './background-blobs';

interface BlobCounterProps {
  count: number,
  color: string,
  blobIndex: number,
  sound?: boolean,
  onClick?: (newCount: number) => void
}

export function BlobCounter({color, count, blobIndex, onClick, sound = false}: BlobCounterProps) {
  const [play] = useSound('/sot20.mp3', {interrupt: true});

  function handleClick() {
    if (sound) {
      play()
    }

    if (onClick) {
      onClick(count + 1)
    }
  }

  return (
    <div className='relative flex items-center justify-center' onClick={handleClick}>
      <button className='text-8xl text-center z-10 relative text-zinc-800 p-16'>
        <span>{count}</span>
      </button>
      <BackgroundBlob className={`fill-${color} absolute top-0 left-0`} stroke={true} blobIndex={blobIndex} />
    </div>
  )
}