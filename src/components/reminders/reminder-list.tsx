'use client';

import ReminderAlertDialog from './reminder-alert-dialog';
import AddReminder from './add-reminder';
import {type Reminder} from '@/database/queries/projects';
import ReminderForm from './reminder-form';
import {useCounterStore} from '@/providers/counter-store-provider';
import {ScrollArea, ScrollBar} from '../ui/scroll-area';

interface ReminderListProps {
  reminders: Reminder[],
  sectionId: number,
}
export default function ReminderList({reminders, sectionId}: ReminderListProps) {

  const {storeCount} = useCounterStore(
    (state) => state,
  )

  return (
    <section className='w-full flex flex-row gap-4 justify-end'>
      <ScrollArea className="w-full">
        <div className='flex flex-row-reverse gap-4 justify-end w-max'>
          {reminders.map(reminder => <ReminderAlertDialog key={reminder.id} reminder={reminder} />)}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      <ReminderForm sectionId={sectionId} count={storeCount} />
    </section>
  );
}