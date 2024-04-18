import {useStore} from '@/app/store';

import useSound from 'use-sound';
import sound from '@/../public/button-01.mp3';

// TODO: editable input 

export default function Counter () {

  const {count, countUp, clickSoundEnabled} = useStore();

  const [play] = useSound('/button-01.mp3');

  function handleClick () {
    countUp();
    play();
  }

  return <button className='   
  text-9xl text-center py-8' onClick={handleClick}>
    <span> {count}</span> </button>;
}