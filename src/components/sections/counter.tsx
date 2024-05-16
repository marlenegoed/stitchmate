'use client'

import {useMemo} from 'react';
// import useSound from 'use-sound';
import BackgroundBlob from '../ui/background-blobs';
import {setActiveSection, updateCount} from '@/database/queries/projects';
import {useCounterStore} from '@/providers/counter-store-provider'

interface CounterProps {
  sectionId: number
}

export default function Counter({sectionId}: CounterProps) {

  const blob = useMemo(() => <BackgroundBlob className='absolute fill-sienna-400 top-0 left-0' stroke={true} />, []);
  // const [play] = useSound('/click-2.mp3');

  const {storeCount, countStoreUp} = useCounterStore(
    (state) => state,
  )

  // console.log(count, storeCount)
  // useEffect(() => {
  //   console.log("called", count)
  //   initialize({storeCount: count})
  // }, [count, initialize])

  async function handleClick() {
    // TODO: Play Sound
    countStoreUp()
    await updateCount(sectionId, storeCount + 1)
    await setActiveSection(sectionId)
  }

  return (
    <div className='relative flex items-center justify-center'>
      <button className='text-8xl text-center z-10 relative text-zinc-800 p-16' onClick={handleClick}>
        <span>{storeCount}</span>
      </button>
      {blob}
    </div >
  );
}