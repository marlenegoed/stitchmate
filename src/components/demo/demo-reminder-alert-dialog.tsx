'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {Button} from "@/components/ui/button";
import {DialogClose} from '@radix-ui/react-dialog';
import ReminderItem from '../reminders/reminder-item';
import ReminderTag from '../reminders/reminder-tag';
import {type Reminder} from '@/database/queries/projects';
import {RangeProgress, RepeatProgress} from '../reminders/reminder-progress';
import ReminderRepeat from '../reminders/reminder-repeat';
import {TbZzz} from "react-icons/tb";
import {HiChevronRight} from "react-icons/hi2";
import clsx from 'clsx';
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area';
import DemoReminderForm from './demo-reminder-form';
import {useDemoStore} from '@/providers/demo-store-provider';
import {useCounterStore} from '@/providers/counter-store-provider';
import {cn} from '@/lib/utils';



interface ReminderAlertDialogProps {
  reminder: Reminder,
  isTag?: boolean,
  className?: string,
}

export default function DemoReminderAlertDialog({className, reminder, isTag}: ReminderAlertDialogProps) {
  const storeCount = useCounterStore(state => state.storeCount)
  const updateReminder = useDemoStore((state) => state.updateReminder)

  const {title, note, type, from, until, start, interval, times, notification} = reminder;

  const reminderProgress = type === 'range'
    ? <RangeProgress from={from} until={until} />
    : <RepeatProgress start={start} interval={interval} times={times} />

  function handleSnooze() {
    const newReminder = {...reminder, notification: !reminder.notification, sectionId: 0}
    updateReminder(newReminder)
  }

  return (
    <Dialog>
      <DialogTrigger className={cn('border-none p-0 m-0 bg-inherit flex justify-center cursor-pointer text-left', className)}>
        {
          isTag ?
            <ReminderTag title={title} /> :
            <ReminderItem reminder={reminder} />
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-10 pr-9">
        <DialogHeader className='gap-4 items-center'>
          <DialogTitle className='ml-1 text-xl mr-auto'>{title}</DialogTitle>
          <TbZzz onClick={handleSnooze} size={20} className={clsx('transition-colors cursor-pointer', {'text-sienna-400 hover:text-sienna-500': !notification, 'text-neutral-500 hover:text-sienna-400': notification})} />
          <DemoReminderForm reminder={reminder} isIcon={true} count={storeCount} />
        </DialogHeader>


        <ScrollArea className='h-32 mb-4'>
          <p className='ml-1'>{note}</p>
          <ScrollBar orientation="vertical" className='bg-neutral-200 transition-colors duration-150 ease-out hover:bg-black' />
        </ScrollArea>


        <DialogFooter className='flex flex-row w-full sm:justify-between justify-between gap-4'>
          <div className='flex flex-row gap-4 items-center px-4 rounded-full py-2'>
            <ReminderRepeat reminder={reminder} />
            <div className='max-[640px]:text-sm flex flex-row gap-3 font-semibold text-neutral-500'>
              {reminderProgress}
            </div>
          </div>

          <DialogClose asChild>
            <Button size='icon' className='flex justify-self-end'><HiChevronRight size={20} /></Button>
          </DialogClose>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}


