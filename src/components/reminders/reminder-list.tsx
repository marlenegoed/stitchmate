'use client';

import ReminderDialog from './reminder-dialog';
import {NewReminder, createReminder, type Reminder} from '@/database/queries/queries';
import ReminderForm, {FormValues} from './reminder-form';
import {useCounterStore} from '@/providers/counter-store-provider';
import {ScrollArea, ScrollBar} from '../ui/scroll-area';
import {useToast} from '@/lib/use-toast';
import {cn} from '@/lib/utils';
import AddReminderCard from './add-reminder-card';
import AddReminder from './add-reminder';
import ReminderItem from './reminder-item';

interface ReminderListProps {
  reminders: Reminder[],
  count: number,
  className?: string
  handleSubmit: (data: FormValues, reminder: Reminder) => Promise<void> | ((data: FormValues, reminder: Reminder) => void),
  handleSnooze: (reminder: Reminder) => void,
}
export default function ReminderList({reminders, count, className, handleSubmit, handleSnooze}: ReminderListProps) {


  return (
    <section className={cn('flex flex-row items-end gap-4', className)}>
      <ScrollArea className="w-fit max-w-full flex">
        <div className='flex flex-row-reverse justify-end w-max h-full gap-4'>
          {reminders.length === 0 ? <AddReminderCard /> :
            reminders.map(reminder => <ReminderDialog
              key={reminder.id}
              reminder={reminder}
              handleSubmit={handleSubmit}
              storeCount={count}
              handleSnooze={handleSnooze}
              // trigger="item"
              triggerBtn={<ReminderItem reminder={reminder} />}
            />
            )}
        </div>
        <ScrollBar orientation="horizontal" className='invisible' />
      </ScrollArea>
      {/* <ReminderForm sectionId={sectionId} count={storeCount} onSubmit={onSubmit} /> */}
    </section>
  );
}