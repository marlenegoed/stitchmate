'use client';

import Counter from '@/components/counter/counter';
import {EditableTitle} from '@/components/counter/counter-title';
import Rows from '@/components/ui/rows';
import CountDownButton from '@/components/counter/count-down-button';
import ReminderList from '@/components/reminder/reminder-list';

// Todo: Edit title -> Rename Component
// Form Validation 

export default function Page () {
  return (
    <>
      <EditableTitle />
      <Counter />
      <div className=' relativ z-10 flex items-center justify-between mx-10 -my-2'>
        <Rows />
        <CountDownButton />
      </div>

      <section className='flex justify-center mt-auto mb-4'>
        <ReminderList ></ReminderList>
      </section>
    </>
  );
};;