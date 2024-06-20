'use client';

import {type Reminder, type NewReminder} from '@/database/queries/queries';
import {useDemoStore} from '@/providers/demo-store-provider';
import ReminderForm, {FormValues} from '../reminders/reminder-form';
import {useCounterStore} from '@/providers/counter-store-provider';

interface ReminderFormProps {
  reminder?: Reminder
  isIcon?: boolean,
  isEmptyNote?: boolean
}

export default function DemoReminderForm({reminder, isIcon, isEmptyNote}: ReminderFormProps) {
  const storeCount = useCounterStore(state => state.storeCount)
  const {updateReminder, setReminder, deleteReminder} = useDemoStore((state) => state)

  async function onSubmit(values: FormValues) {
    if (reminder) {
      const updatedReminder: Reminder = {...reminder, ...values}
      updateReminder(updatedReminder)
    } else {
      const newReminder: NewReminder = {...values, sectionId: 0}
      setReminder(newReminder)
    }
  }

  function handleDelete() {
    if (reminder) {
      deleteReminder(reminder.id)
    }
  }

  return <ReminderForm count={storeCount} reminder={reminder} isIcon={isIcon} isEmptyNote={isEmptyNote} onSubmit={onSubmit} sectionId={0} handleDelete={handleDelete} />
}

