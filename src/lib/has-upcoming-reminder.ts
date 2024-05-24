import {Reminder} from '@/database/queries/projects'
import findNextReminders from './find-next-reminders'

export default function hasUpComingReminder(count: number, reminders: Reminder[], direction: number) {

  const currentReminders = findNextReminders(reminders, count).map(reminder => reminder.id)

  const nextRow = count + direction
  const nextReminders = findNextReminders(reminders, nextRow).map(reminder => reminder.id)

  const newReminders = nextReminders.filter(reminder => !currentReminders.includes(reminder))

  return newReminders.length > 0

}