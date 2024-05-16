'use client';

import ReminderAlertDialog from './reminder-alert-dialog';
import AddReminder from './add-reminder';
import { type Reminder } from '@/database/queries/projects';

interface ReminderListProps {
  reminders: Reminder[],
  sectionId: number,
}
export default function ReminderList({reminders, sectionId}: ReminderListProps) {

  return (
    <section className='overflow-x-auto w-full'>
      <div className='flex flex-row-reverse gap-4 justify-start'>
        <AddReminder sectionId={sectionId} />
        {reminders.map(reminder => <ReminderAlertDialog key={reminder.id} reminder={reminder}/>)}
      </div>
    </section>
  );
}