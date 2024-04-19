'use client';

import useSound from 'use-sound';

import {useStore} from './store';
import Counter from '@/components/ui/counter';
import {Button} from '@/components/ui/button';
import {EditableTitle} from '@/components/ui/counter-title';
import ResetAlert from '@/components/ui/reset-alert-dialog';
import ReminderConfigDialog from '@/components/ui/reminder-config-dialog';
import Rows from '@/components/ui/rows';
import ReminderCarousel from '@/components/ui/reminder-carousel';

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
      <Counter />
      <Rows />
      <section className='flex justify-around'>
        <Button size="icon" onClick={handleCountDown}>
          <FaMinus />
        </Button>
        <Button size="icon" onClick={toggleSound}>
          {toggleSoundIcon}
        </Button>
        <ResetAlert />
      </section>
      <ReminderConfigDialog />

    </>
  );

};;