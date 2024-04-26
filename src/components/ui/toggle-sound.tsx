
import {useStore} from '@/app/store';

import {FaVolumeHigh, FaVolumeXmark} from "react-icons/fa6";
import {Button} from './button';

export default function ToggleSound () {
  const {clickSoundEnabled, toggleSound} = useStore();
  const toggleSoundIcon = clickSoundEnabled ? <FaVolumeHigh /> : <FaVolumeXmark />;

  return (
    <Button size="icon" onClick={toggleSound} className='bg-sienna-400'>
      {toggleSoundIcon}
    </Button>
  );
}
