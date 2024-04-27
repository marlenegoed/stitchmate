import {useStore} from '@/app/store';
import {useMemo} from 'react';

import useSound from 'use-sound';
import BackgroundBlob from '../ui/background-blobs';

export default function Counter () {

  const {count, countUp, clickSoundEnabled} = useStore();
  const blob = useMemo(() => <BackgroundBlob className='absolute fill-sienna-400 top-0 left-0' />, []);

  const [play] = useSound('/click-2.mp3');

  function handleClick () {
    countUp();

    if (clickSoundEnabled) {
      play();
    }
  }

  return (
    <div className='relative flex items-center justify-center'>
      <button className='text-8xl text-center z-10 relative text-zinc-800 p-16' onClick={handleClick}>
        <span>{count}</span>
      </button>
      {blob}
    </div >
  );
}