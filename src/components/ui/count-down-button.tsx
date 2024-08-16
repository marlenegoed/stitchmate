import {HiArrowUturnLeft} from 'react-icons/hi2'
import {Button} from './button'
import useSound from 'use-sound';
import {Tooltip} from './tooltip';
import {Reminder} from '@/database/queries/queries';
import hasUpComingReminder from '@/lib/has-upcoming-reminder';

interface CountDownButtonProps {
  count: number,
  handleChange: (cound: number) => void,
  sound: boolean,
  reminders: Reminder[]
}

export function CountDownButton({count, handleChange, sound = false, reminders}: CountDownButtonProps) {

  const [play] = useSound('/glitch-click.wav', {interrupt: true});
  const [playReminder] = useSound('/teasounds_click.wav', {interrupt: true});

  function handleClick() {

    let newCount = count

    if (count > 1) {
      newCount = count - 1
    }

    if (count <= 1) {newCount = 1}

    handleChange(newCount)

    if (sound) {
      if (hasUpComingReminder(count, reminders, -1)) {
        playReminder()
      } else {
        play()
      }

    }
  }

  return (
    // <Tooltip title="Unravel">
    <Button
      type='button'
      size='icon'
      // variant='ghost'
      className='rounded-full pb-1'
      onClick={handleClick}
      disabled={count === 1}
    >—</Button>
    // </Tooltip>
  )
}