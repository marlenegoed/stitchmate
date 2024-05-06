'use client';

import ReminderAlertDialog from './reminder-alert-dialog';
import AddReminder from './add-reminder';
import {type Reminder} from '@/lib/reminder';

interface ReminderListProps {
  reminders: Reminder[],
  projectId: string
}
export default function ReminderList({reminders, projectId}: ReminderListProps) {

  return (
    <section className='overflow-x-auto'>
      <div className='flex gap-4'>
        {reminders.map(reminder => <ReminderAlertDialog key={reminder.id} reminder={reminder} projectId={projectId} />)}
        <AddReminder projectId={projectId} />
      </div>
    </section>
  );
}