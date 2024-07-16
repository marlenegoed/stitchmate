'use client';

import ReminderAlertDialog from './reminder-alert-dialog';
import {NewReminder, createReminder, type Reminder} from '@/database/queries/queries';
import ReminderForm, {FormValues} from './reminder-form';
import {useCounterStore} from '@/providers/counter-store-provider';
import {ScrollArea, ScrollBar} from '../ui/scroll-area';
import {useToast} from '@/lib/use-toast';
import {cn} from '@/lib/utils';

interface ReminderListProps {
  userId: string,
  reminders: Reminder[],
  sectionId: number,
  className?: string
}
export default function ReminderList({userId, reminders, sectionId, className}: ReminderListProps) {
  const {toast} = useToast()
  const {storeCount} = useCounterStore((state) => state)

  async function onSubmit(values: FormValues) {
    const newReminder: NewReminder = {...values, sectionId}
    await createReminder(userId, newReminder)
    toast({title: "Created reminder"})
  }

  return (
    <section className={cn('col-start-1 col-span-12 row-start-auto row-span-4 flex flex-row items-end h-full gap-4', className)}>
      <ScrollArea className="w-fit max-w-full flex">
        <div className='flex flex-row-reverse justify-end w-max h-full gap-4'>
          {reminders.length === 0 ? <ReminderForm sectionId={0} count={storeCount} onSubmit={onSubmit} isDefaultReminderItem={true} /> :
            reminders.map(reminder => <ReminderAlertDialog key={reminder.id} userId={userId} reminder={reminder} />)}
        </div>
        <ScrollBar orientation="horizontal" className='invisible' />
      </ScrollArea>
      <ReminderForm sectionId={sectionId} count={storeCount} onSubmit={onSubmit} />
    </section>
  );
}