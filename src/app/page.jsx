'use client';

import useSound from 'use-sound';

import {useStore} from './store';
import Counter from '@/components/counter/counter';
import {Button} from '@/components/ui/button';
import {EditableTitle} from '@/components/counter/counter-title';
import ReminderConfigDialog from '@/components/reminder/reminder-config-dialog';
import Rows from '@/components/ui/rows';
import Reminder from '@/components/reminder/reminder';
import CountDownButton from '@/components/counter/count-down-button';
import ReminderCarousel from '@/components/reminder/reminder-carousel';

import {FaMinus} from "react-icons/fa6";
import ReminderAlertDialog from '@/components/reminder/reminder-alert-dialog';
import ReminderList from '@/components/reminder/reminder-list';


// Todo: Edit title -> Rename Component
// Form Validation 


export default function Page () {

  // const {countDown, clickSoundEnabled} = useStore();

  // const [play] = useSound('/click-2.mp3');
  // function handleCountDown () {
  //   countDown();
  //   if (clickSoundEnabled) {
  //     play();
  //   }
  // }

  return (
    <>
      <EditableTitle />
      <Counter />
      <div className=' relativ z-10 flex items-center justify-between mx-10 -my-2'>
        <Rows />
        {/* <Button size="icon" onClick={handleCountDown}>
          <FaMinus />
        </Button> */}
        <CountDownButton />
      </div>

      <section className='flex justify-center mt-auto mb-4'>
        <ReminderList ></ReminderList>
        {/* <ReminderAlertDialog title='new reminder' note='test text text'></ReminderAlertDialog>
        <ReminderConfigDialog /> */}
      </section>



    </>
  );

};;