import {HiMiniArrowUturnLeft} from 'react-icons/hi2'

import {Button} from './button'
import useSound from 'use-sound';
import {Tooltip, TooltipContent, TooltipTrigger} from './tooltip';

export function CountDownButton({count, handleChange, sound = false}: {sound: boolean, count: number, handleChange: (count: number) => void}) {
  const [play] = useSound('/sot13.mp3', {interrupt: true});

  function handleClick() {
    let newCount = count

    if (count > 1) {
      newCount = count - 1
    }

    if (newCount <= 1) {newCount = 1}
    if (sound) play()

    handleChange(newCount)
  }

  return (
    <Tooltip title="Unravel">
      <Button
        type='button'
        size='icon'
        variant='ghost'
        className='border-slate-800 hover:bg-neutral-200 hover:bg-opacity-80 transition-colors'
        onClick={handleClick}
        disabled={count === 1}
      >
        <HiMiniArrowUturnLeft size={20} />
      </Button>
    </Tooltip>
  )
}