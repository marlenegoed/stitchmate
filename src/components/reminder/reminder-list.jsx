'use client';

import {useStore} from '@/app/store';

import Reminder from './reminder';
import AddReminder from './add-reminder';
import ReminderConfigDialog from './reminder-config-dialog';

export default function ReminderList () {

  const {reminders} = useStore();
  console.log(reminders);
  return (

    <section className='overflow-x-auto'>
      <div className='flex gap-4'>
        {reminders.map(reminder => {
          return <Reminder key={reminder.id} reminder={reminder} />;
        })
        }
        <ReminderConfigDialog />
      </div>
    </section>
  );


}