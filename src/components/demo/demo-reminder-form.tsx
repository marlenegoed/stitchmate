'use client';

import {type Reminder, type NewReminder} from '@/database/queries/projects';
import {useDemoStore} from '@/providers/demo-store-provider';
import ReminderForm, {FormValues} from '../reminders/reminder-form';
import {useCounterStore} from '@/providers/counter-store-provider';

interface ReminderFormProps {
  reminder?: Reminder
  count: number,
  isIcon?: boolean
}

export default function DemoReminderForm({reminder, isIcon}: ReminderFormProps) {
  const storeCount = useCounterStore(state => state.storeCount)
  const {updateReminder, setReminder} = useDemoStore((state) => state)

  async function onSubmit(values: FormValues) {
    if (reminder) {
      const updatedReminder: Reminder = {...reminder, ...values}
      updateReminder(updatedReminder)
    } else {
      const newReminder: NewReminder = {...values, sectionId: 0}
      setReminder(newReminder)
    }
  }

  return <ReminderForm count={storeCount} reminder={reminder} isIcon={isIcon} onSubmit={onSubmit} sectionId={0} />
}

