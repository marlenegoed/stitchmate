import {useStore} from '@/app/store';
import {useMemo} from 'react';

import useSound from 'use-sound';
import BackgroundBlob from '../ui/background-blobs';

// TODO: editable input 

export default function Counter () {

  const {count, countUp, clickSoundEnabled} = useStore();
  const blob = useMemo(() => <BackgroundBlob className='absolute fill-emerald-200 top-0 left-0' />, []);

  const [play] = useSound('/click-2.mp3');

  function handleClick () {
    countUp();

    if (clickSoundEnabled) {
      play();
    }
  }

  return (
    <div className='relative mt-10 p-8 flex items-center justify-center'>
      {/* <svg src={Blob} className="fill-emerald-200" /> */}
      <button className='min-w-48 px-6 text-8xl text-center py-8 z-10 relative' onClick={handleClick}>
        <span>{count}</span>
      </button>
      {blob}
    </div >
  );
}