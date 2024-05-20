'use client'

import {type Reminder} from '@/database/queries/projects';
import ReminderAlertDialog from './reminder-alert-dialog';
import {useCounterStore} from '@/providers/counter-store-provider'
import findNextReminders from '@/lib/find-next-reminders';

export default function ReminderPrompt({reminders}: {reminders: Reminder[]}) {

  const {storeCount} = useCounterStore(
    (state) => state,
  )
  const nextReminders = findNextReminders(reminders, storeCount)

  return (
    <div className="flex gap-4 -mt-4">
      {nextReminders.map(reminder => <ReminderAlertDialog key={reminder.id} reminder={reminder} isTag={true} />)}
    </div>
  );
}


