'use client';

import ReminderAlertDialog from './reminder-alert-dialog';
import AddReminder from './add-reminder';
import {type Reminder} from '@/lib/reminder';

export default function ReminderList({reminders}: {reminders: Reminder[]}) {

  return (
    <section className='overflow-x-auto'>
      <div className='flex gap-4'>
        {reminders.map(reminder => <ReminderAlertDialog key={reminder.id} reminder={reminder} />)}
        <AddReminder />
      </div>
    </section>
  );
}