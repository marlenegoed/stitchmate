'use client';

import {useStore} from '@/app/store';

import ReminderAlertDialog from './reminder-alert-dialog';
import AddReminder from './add-reminder';
import { Key } from 'react';
import { ReminderType } from './reminder_def';

export default function ReminderList () {
  const {reminders} = useStore();

  return (
    <section className='overflow-x-auto'>
      <div className='flex gap-4'>
        {reminders.map((reminder: ReminderType) => <ReminderAlertDialog key={reminder.id} reminder={reminder} />)}
        <AddReminder />
      </div>
    </section>
  );
}