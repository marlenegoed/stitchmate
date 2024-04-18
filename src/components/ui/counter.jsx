import {useStore} from '@/app/store';

import useSound from 'use-sound';

// TODO: editable input 

export default function Counter () {

  const {count, countUp, clickSoundEnabled} = useStore();

  const [play] = useSound('/click-2.mp3');

  function handleClick () {
    countUp();

    if (clickSoundEnabled) {
      play();
    }
  }

  return <button className='   
  text-9xl text-center py-8' onClick={handleClick}>
    <span>{count}</span> </button>;
}