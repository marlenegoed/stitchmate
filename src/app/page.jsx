'use client';

import useSound from 'use-sound';

import {useStore} from './store';
import Counter from '@/components/ui/counter';
import {Button} from '@/components/ui/button';
import {EditableTitle} from '@/components/ui/counter-title';
import ReminderConfigDialog from '@/components/ui/reminder-config-dialog';
import Rows from '@/components/ui/rows';
import ReminderCarousel from '@/components/ui/reminder-carousel';
import CounterProgress from '@/components/ui/counter-progress';

import {FaMinus, FaVolumeHigh, FaVolumeXmark} from "react-icons/fa6";


// Todo: Edit title -> Rename Component
// Form Validation 


export default function Page () {

  const {countDown, clickSoundEnabled, toggleSound} = useStore();

  const [play] = useSound('/click-2.mp3');
  function handleCountDown () {
    countDown();
    if (clickSoundEnabled) {
      play();
    }
  }

  const toggleSoundIcon = clickSoundEnabled ? <FaVolumeHigh /> : <FaVolumeXmark />;

  return (
    <>
      <EditableTitle />
      <ReminderCarousel />
      <div className='border border-neutral-200 rounded-2xl shadow-sm flex items-center justify-center min-w-48 px-6' >
        <Counter />
      </div>
      <div className='flex flex-row'>
        {/* <Rows /> */}
        <CounterProgress />
      </div>
      <section className='flex justify-around'>
        <Button size="icon" onClick={handleCountDown} className="mt-6">
          <FaMinus />
        </Button>
      </section>
      <ReminderConfigDialog />
    </>
  );

};;