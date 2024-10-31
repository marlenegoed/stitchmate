'use client'

import {Reminder, updateReminder, toogleSnooze, createReminder} from '@/database/queries/queries'
import {FormValues} from '../reminders/reminder-form'
import {toast} from '@/lib/use-toast'
import ReminderList from '../reminders/reminder-list'
import {useCounterStore} from '@/providers/counter-store-provider'
import findNextReminders from '@/lib/find-next-reminders'
import ReminderDialog from '../reminders/update-reminder'
import ReminderTag from '../reminders/reminder-tag'
import UpdateReminderDialog from '../reminders/update-reminder'

export default function SectionReminders({userId, sectionId, reminders, className, isTag}: {userId: string, sectionId: number, reminders: Reminder[], className?: string, isTag?: boolean}) {

  const storeCount = useCounterStore(state => state.storeCount)

  async function handleUpdateSubmit(data: FormValues, reminder: Reminder) {
    const updatedReminder: Reminder = {...reminder, ...data}
    await updateReminder(userId, updatedReminder)
    toast({title: "Reminder updated"})
  }

  async function handleNewSubmit (data: FormValues) {
      const newReminder = {...data, sectionId}
      await createReminder(userId, newReminder)
      toast({title: "Reminder created"})
    }

  async function handleSnooze(reminder: Reminder) {
    await toogleSnooze(userId, reminder.sectionId, reminder.id)
  }

  if (isTag) {
    const nextReminders = findNextReminders(reminders, storeCount)
    return (
      nextReminders.map(reminder => <UpdateReminderDialog key={reminder.id} reminder={reminder} triggerBtn={<ReminderTag title={reminder.title} />} handleSnooze={handleSnooze} handleSubmit={handleUpdateSubmit} storeCount={storeCount}
      />)
    )
  }

  return (
    <ReminderList reminders={reminders} count={storeCount} className={className} handleNewSubmit={handleNewSubmit} handleUpdateSubmit={handleUpdateSubmit} handleSnooze={handleSnooze} />
  )
}