'use client'

import {type Reminder} from '@/database/queries/queries';
import ReminderAlertDialog from './reminder-alert-dialog';
import {useCounterStore} from '@/providers/counter-store-provider'
import findNextReminders from '@/lib/find-next-reminders';

export default function ReminderPrompt({userId, reminders, ...props}: {userId: string, reminders: Reminder[], className?: string}) {
  const storeCount = useCounterStore((state) => state.storeCount)
  const nextReminders = findNextReminders(reminders, storeCount)

  return (
    nextReminders.map(reminder => <ReminderAlertDialog key={reminder.id} userId={userId} reminder={reminder} isTag={true} {...props} />)
  );
}


