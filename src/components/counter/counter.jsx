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
    <div className='relative p-8 flex items-center justify-center'>
      <button className='min-w-48 px-6 text-8xl text-center py-8 z-10 relative text-zinc-800 sm:p-4 sm:p-t-0' onClick={handleClick}>
        <span>{count}</span>
      </button>
      {blob}
    </div >
  );
}