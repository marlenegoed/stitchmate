'use client'

import {type Reminder} from '@/database/queries/projects';
import ReminderAlertDialog from './reminder-alert-dialog';
import {useCounterStore} from '@/providers/counter-store-provider'
import findNextReminders from '@/lib/find-next-reminders';

export default function ReminderPrompt({reminders, ...props}: {reminders: Reminder[], className?: string}) {
  const storeCount = useCounterStore((state) => state.storeCount)
  const nextReminders = findNextReminders(reminders, storeCount)

  return (
    nextReminders.map(reminder => <ReminderAlertDialog key={reminder.id} reminder={reminder} isTag={true} {...props} />)
  );
}


