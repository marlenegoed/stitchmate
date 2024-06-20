'use client'

import useSound from 'use-sound';
import BackgroundBlob from './background-blobs';
import {Reminder} from '@/database/queries/queries';
import hasUpComingReminder from '@/lib/has-upcoming-reminder';
import {kalam} from './fonts';


interface BlobCounterProps {
  count: number,
  color: string,
  blobIndex: number,
  sound?: boolean,
  onClick?: (newCount: number) => void
  reminders: Reminder[]
}

export function BlobCounter({color, count, blobIndex, onClick, sound = false, reminders}: BlobCounterProps) {
  const [play] = useSound('/button-pressed.wav', {interrupt: true});
  const [playReminder] = useSound('/teasounds_click.wav', {interrupt: true})


  function handleClick() {
    if (sound) {
      if (hasUpComingReminder(count, reminders, 1)) {
        playReminder()
      } else
        play()
    }

    if (onClick) {
      onClick(count + 1)
    }
  }

  return (
    <div className='relative flex items-center justify-center p-28' onClick={handleClick}>
      <button className='text-9xl text-center z-10 relative text-zinc-800 w-[5ch]'>
        <span className={`${kalam.className} font-normal`}>{count}</span>
      </button>
      <BackgroundBlob className={`fill-${color} absolute w-full top-0 left-0`} stroke={true} blobIndex={blobIndex} />
    </div>
  )
}

