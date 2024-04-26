import {useStore} from '@/app/store';
import useSound from 'use-sound';
import {FaMinus} from "react-icons/fa6";
import {Button} from '../ui/button';

export default function CountDownButton () {
  const {countDown, clickSoundEnabled} = useStore();

  const [play] = useSound('/click-2.mp3');

  function handleCountDown () {
    countDown();
    if (clickSoundEnabled) {
      play();
    }
  }

  return (
    <Button size='icon' variant='secondary' className='' onClick={handleCountDown}>
      <FaMinus className='fill-neutral-50' />
    </Button>
  );
}