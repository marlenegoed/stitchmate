import {HiOutlineArrowUturnLeft} from 'react-icons/hi2'
import {Button} from './button'
import useSound from 'use-sound';

export function CountDownButton({count, handleChange, sound = false}: {sound: boolean, count: number, handleChange: (count: number) => void}) {
  const [play] = useSound('/click-2.mp3', {interrupt: true});

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
    <Button type='button' size='icon' variant='ghost' className='border-slate-800' onClick={handleClick} >
      <HiOutlineArrowUturnLeft size={20} />
    </Button>
  )
}