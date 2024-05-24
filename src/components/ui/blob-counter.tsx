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
  const [play] = useSound('/button-pressed.wav', {interrupt: true});
  const [playReminder] = useSound('/teasounds_click.wav', {interrupt: true})

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
      <button className='text-8xl text-center z-10 relative text-zinc-800 p-16 w-[5ch]'>
        <span>{count}</span>
      </button>
      <BackgroundBlob className={`fill-${color} absolute top-0 left-0`} stroke={true} blobIndex={blobIndex} />
    </div>
  )
}