'use client';

import {useStore} from '@/app/store';

import ReminderConfigDialog from './reminder-config-dialog';
import ReminderAlertDialog from './reminder-alert-dialog';

export default function ReminderList () {
  const {reminders} = useStore();

  return (
    <section className='overflow-x-auto'>
      <div className='flex gap-4'>
        {reminders.map(reminder => {
          return <ReminderAlertDialog key={reminder.id} reminder={reminder} />;
        })
        }
        <ReminderConfigDialog />
      </div>
    </section>
  );


}