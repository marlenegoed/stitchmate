'use client'

import {Reminder, updateReminder, toogleSnooze} from '@/database/queries/queries'
import {FormValues} from '../reminders/reminder-form'
import {toast} from '@/lib/use-toast'
import ReminderList from '../reminders/reminder-list'
import {useCounterStore} from '@/providers/counter-store-provider'
import findNextReminders from '@/lib/find-next-reminders'
import ReminderDialog from '../reminders/reminder-dialog'
import ReminderTag from '../reminders/reminder-tag'
import {useState} from 'react'

export default function SectionReminders({userId, reminders, className, isTag}: {userId: string, reminders: Reminder[], className?: string, isTag?: boolean}) {

  const storeCount = useCounterStore(state => state.storeCount)

  async function handleSubmit(data: FormValues, reminder: Reminder) {
    const updatedReminder: Reminder = {...reminder, ...data}
    await updateReminder(userId, updatedReminder)
    toast({title: "Reminder updated"})
  }

  async function handleSnooze(reminder: Reminder) {
    await toogleSnooze(userId, reminder.sectionId, reminder.id)
  }

  if (isTag) {
    const nextReminders = findNextReminders(reminders, storeCount)
    return (
      nextReminders.map(reminder => <ReminderDialog key={reminder.id} reminder={reminder} triggerBtn={<ReminderTag title={reminder.title} />} handleSnooze={handleSnooze} handleSubmit={handleSubmit} storeCount={storeCount}
      />)
    )
  }

  return (
    <ReminderList reminders={reminders} count={storeCount} className={className} handleSubmit={handleSubmit} handleSnooze={handleSnooze} />
  )
}