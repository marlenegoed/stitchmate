'use client';

import ReminderAlertDialog from './reminder-alert-dialog';
import {NewReminder, createReminder, type Reminder} from '@/database/queries/queries';
import ReminderForm, {FormValues} from './reminder-form';
import {useCounterStore} from '@/providers/counter-store-provider';
import {ScrollArea, ScrollBar} from '../ui/scroll-area';
import {useToast} from '@/lib/use-toast';
import {cn} from '@/lib/utils';

interface ReminderListProps {
  reminders: Reminder[],
  sectionId: number,
  className?: string
}
export default function ReminderList({reminders, sectionId, className}: ReminderListProps) {
  const {toast} = useToast()
  const {storeCount} = useCounterStore((state) => state)

  async function onSubmit(values: FormValues) {
    const newReminder: NewReminder = {...values, sectionId}
    await createReminder(newReminder)
    toast({title: "Created reminder"})
  }

  return (
    <section className={cn('w-full flex flex-row gap-4 justify-end mt-auto mb-4 px-6', className)}>
      <ScrollArea className="w-full">
        <div className='flex flex-row-reverse gap-4 justify-end w-max'>
          {reminders.map(reminder => <ReminderAlertDialog key={reminder.id} reminder={reminder} />)}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      <ReminderForm sectionId={sectionId} count={storeCount} onSubmit={onSubmit} />
    </section>
  );
}