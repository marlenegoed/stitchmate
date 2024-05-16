'use client'

import {type Reminder} from '@/database/queries/projects';
import ReminderAlertDialog from './reminder-alert-dialog';
import {useCounterStore} from '@/providers/counter-store-provider'

export default function ReminderPrompt({reminders}: {reminders: Reminder[]}) {

  const {storeCount} = useCounterStore(
    (state) => state,
  )
  const nextReminders = findNextReminders(reminders, storeCount)

  return (
    <div className="flex gap-4 -mt-4">
      {nextReminders.map(reminder => <ReminderAlertDialog key={reminder.id} reminder={reminder} isTag={true}/>)}
    </div>
  );
}

export function findNextReminders(reminders: Reminder[], count: number) {

  const nextReminders = reminders.filter(reminder => {
    if (reminder.type === 'repeating') {
      if (reminder.start! > count) return false

      return (count - reminder.start!) % reminder.interval! === 0
        && (count - reminder.start!) / reminder.interval! <= reminder.times!
    }

    return count >= reminder.from! && count <= reminder.until!

  })

  return nextReminders.filter(reminder => reminder.notification)

}

