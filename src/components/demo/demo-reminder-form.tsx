'use client';

import {type Reminder, type NewReminder} from '@/database/queries/queries';
import {useDemoStore} from '@/providers/demo-store-provider';
import ReminderForm, {FormValues} from '../reminders/reminder-form';
import {useCounterStore} from '@/providers/counter-store-provider';
import {useToast} from '@/lib/use-toast';

interface ReminderFormProps {
  reminder?: Reminder
  count: number,
  isIcon?: boolean
}

export default function DemoReminderForm({reminder, isIcon}: ReminderFormProps) {
  const storeCount = useCounterStore(state => state.storeCount)
  const {updateReminder, setReminder, deleteReminder} = useDemoStore((state) => state)
  const {toast} = useToast()

  async function onSubmit(values: FormValues) {
    if (reminder) {
      const updatedReminder: Reminder = {...reminder, ...values}
      updateReminder(updatedReminder)
      toast({title: "Updated reminder"})
    } else {
      const newReminder: NewReminder = {...values, sectionId: 0}
      setReminder(newReminder)
      toast({title: "Created reminder"})
    }
  }

  function handleDelete() {
    if (reminder) {
      deleteReminder(reminder.id)
    }
    toast({title: "Deleted reminder"})
  }

  return <ReminderForm count={storeCount} reminder={reminder} isIcon={isIcon} onSubmit={onSubmit} sectionId={0} handleDelete={handleDelete} />
}

