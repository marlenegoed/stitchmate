'use client';

import Counter from '@/components/counter/counter';
import Title from '@/components/ui/title';
import Rows from '@/components/counter/rows';
import CountDownButton from '@/components/counter/count-down-button';
import ReminderList from '@/components/reminder/reminder-list';
import {selectNotifiableNextReminders, useStore} from './store';
import Reminder from '@/components/reminder/reminder-item';
import ReminderTag from '@/components/reminder/reminder-tag';
import ReminderAlertDialog from '@/components/reminder/reminder-alert-dialog';

// Todo: Edit title -> Rename Component
// Form Validation 

export default function Page () {
  return (
    <>
      <Title className='mt-2 mb-3' />
      {/* <section className='min-h-5 flex justify-center items-center w-full'>
        <ReminderNotification />
      </section > */}
      <section className='w-full flex-1 flex-col flex justify-center' >
        <div className='mb-auto'>
          <div className='flex justify-center w-full min-h-10'>
            <ReminderNotification />
          </div >
          <Counter />
        </div>
        <div className='flex flex-row w-full justify-between self-end pr-2 mb-4'>
          <Rows />
          <CountDownButton />
        </div>
      </section>

      <section className='flex justify-center w-full mt-auto mb-4'>
        <ReminderList ></ReminderList>
      </section>
    </>
  );
}

function ReminderNotification () {

  const nextReminders = useStore(selectNotifiableNextReminders);

  return (
    <div className="flex gap-4 position relative z-20 ">
      {nextReminders.map(reminder => <ReminderAlertDialog key={reminder.id} reminder={reminder} isTag={true} />)}
    </div>
  );
}