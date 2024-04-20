import {useStore} from '@/app/store';

import useSound from 'use-sound';
import Blob from './background-blob';

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

  return (
    <div className='relative'>
      {/* <svg src={Blob} className="fill-emerald-200" /> */}
      <button className='min-w-48 px-6 text-9xl text-center py-8 z-10 relative' onClick={handleClick}>
        <span>{count}</span>
      </button>
      <Blob className='absolute fill-emerald-200 top-0' />
    </div >
  );
}