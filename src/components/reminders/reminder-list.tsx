'use client';

import ReminderDialog from './update-reminder';
import {type Reminder} from '@/database/queries/queries';
import {FormValues} from './reminder-form';
import {ScrollArea, ScrollBar} from '../ui/scroll-area';
import {cn} from '@/lib/utils';
import AddReminderCard from './add-reminder-card';
import AddReminder from './add-reminder';
import ReminderItem from './reminder-item';
import CreateReminderDialog from './create-reminder';

interface ReminderListProps {
  reminders: Reminder[],
  count: number,
  className?: string,
  handleNewSubmit: (data: FormValues) => Promise<void> | ((data: FormValues) => void),
  handleUpdateSubmit: (data: FormValues, reminder: Reminder) => Promise<void> | ((data: FormValues, reminder: Reminder) => void),
  handleSnooze: (reminder: Reminder) => void,
}
export default function ReminderList({reminders, count, className, handleNewSubmit, handleUpdateSubmit, handleSnooze}: ReminderListProps) {

  return (
    <section className={cn('flex flex-row items-end gap-4', className)}>
      <ScrollArea className="w-fit max-w-full flex">
        <div className='flex flex-row justify-end w-max h-full gap-4'>

          { reminders.length === 0 && <CreateReminderDialog
              onSubmit={handleNewSubmit}
              count={count}
              triggerBtn={<AddReminderCard />}
            />
           }
      { 
          reminders.map(reminder => <ReminderDialog
              key={reminder.id}
              reminder={reminder}
              handleSubmit={handleUpdateSubmit}
              storeCount={count}
              handleSnooze={handleSnooze}
              triggerBtn={<ReminderItem reminder={reminder} />}
            />
            )}
            <CreateReminderDialog 
            onSubmit={handleNewSubmit}
            count={count}
            triggerBtn={<AddReminder />} 
            />
        </div>
        <ScrollBar orientation="horizontal" className='invisible' />
      </ScrollArea>
      {/* <ReminderForm sectionId={sectionId} count={storeCount} onSubmit={onSubmit} /> */}
    </section>
  );
}