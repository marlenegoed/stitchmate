'use client';

import Counter from '@/components/counter/counter';
import {CounterTitle} from '@/components/ui/title';
import Rows from '@/components/counter/rows';
import CountDownButton from '@/components/counter/count-down-button';
import ReminderList from '@/components/reminder/reminder-list';
import {selectNotifiableNextReminders, useStore} from './store';
import Reminder from '@/components/reminder/reminder';
import ReminderTag from '@/components/reminder/reminder-tag';
import ReminderAlertDialog from '@/components/reminder/reminder-alert-dialog';

// Todo: Edit title -> Rename Component
// Form Validation 

export default function Page () {
  return (
    <>
      <CounterTitle className='' />
      <section className='min-h-16 flex justify-center items-center w-full'>
        <ReminderNotification />
      </section>

      <section className='w-full flex-1 flex-col flex item-center' >
        <Counter />
        <div className='flex flex-col w-fit justify-center px-4'>
          <Rows />
          <CountDownButton />
        </div>
      </section>

      <section className='flex justify-center mb-2 w-full mt-auto mb-4'>
        <ReminderList ></ReminderList>
      </section>
    </>
  );
}

function ReminderNotification () {
  const nextReminders = useStore(selectNotifiableNextReminders);

  return (
    <div className="flex gap-4 position relative z-20">
      {nextReminders.map(reminder => <ReminderAlertDialog key={reminder.id} reminder={reminder} tag={true} />)}
    </div>
  );
}