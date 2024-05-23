import {Reminder, NewReminder} from '@/database/queries/projects'

export default function findNextReminders(reminders: Reminder[], count: number): Reminder[] {

  const nextReminders = reminders.filter(reminder => {
    if (reminder.type === 'repeating') {
      if (reminder.start! > count) return false

      return (count - reminder.start!) % reminder.interval! === 0
        && (count - reminder.start!) / reminder.interval! < reminder.times!
    }

    return count >= reminder.from! && count <= reminder.until!

  })

  return nextReminders.filter(reminder => reminder.notification)

}
