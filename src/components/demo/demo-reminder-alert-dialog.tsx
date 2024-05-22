'use client'
import {
  Alert,
} from "@/components/ui/alert";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {Button} from "@/components/ui/button";
import {DialogClose} from '@radix-ui/react-dialog';
import ReminderItem from '../reminders/reminder-item';
import ReminderTag from '../reminders/reminder-tag';
import Link from 'next/link';
import {type NewReminder, type Reminder} from '@/database/queries/projects';
import {RangeProgress, RepeatProgress} from '../reminders/reminder-progress';
import ReminderRepeat from '../reminders/reminder-repeat';
import {TbZzz} from "react-icons/tb";
import {HiAdjustmentsVertical} from "react-icons/hi2";
import {HiChevronRight} from "react-icons/hi2";
import clsx from 'clsx';
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area';
import DemoReminderForm from './demo-reminder-form';
import {useDemoStore} from '@/providers/demo-store-provider';
import {useCounterStore} from '@/providers/counter-store-provider';



interface ReminderAlertDialogProps {
  reminder: Reminder,
  isTag?: boolean
}

export default function DemoReminderAlertDialog({reminder, isTag}: ReminderAlertDialogProps) {
  const storeCount = useCounterStore(state => state.storeCount)
  const updateReminder = useDemoStore((state) => state.updateReminder)

  const {title, note, type, from, until, start, interval, times, notification} = reminder;

  const reminderProgress = type === 'range' ? <RangeProgress className='font-semibold text-slate-700' from={from} until={until} /> : <RepeatProgress className='font-semibold text-slate-700' start={start} interval={interval} times={times} />

  function handleSnooze() {
    const newReminder = {...reminder, notification: !reminder.notification, sectionId: 0}
    updateReminder(newReminder)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Alert className='border-none p-0 m-0 bg-inherit'>
          {
            isTag ?
              <ReminderTag title={title} /> :
              <ReminderItem reminder={reminder} />
          }
        </Alert>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-10 pr-9">
        <DialogHeader className='gap-4'>
          <DialogTitle className='text-xl mr-auto'>{title}</DialogTitle>

          <span className="flex items-center">
            <TbZzz onClick={handleSnooze} size={20} className={clsx('transition-colors cursor-pointer', {'text-sienna-400 hover:text-sienna-500': !notification, 'text-neutral-500 hover:text-sienna-400': notification})} />
          </span>
          <DemoReminderForm reminder={reminder} isIcon={true} count={storeCount} />
        </DialogHeader>


        <ScrollArea className='h-32 mb-4'>
          <p className='ml-1'>{note}</p>
          <ScrollBar orientation="vertical" className='bg-neutral-100 transition-colors duration-[160ms] ease-out hover:bg-black' />
        </ScrollArea>


        <DialogFooter className='flex flex-row justify-start w-full sm:justify-between'>
          <div className='flex flex-row gap-4 items-center px-4 rounded-full py-2 bg-neutral-200'>
            < ReminderRepeat reminder={reminder} />
            <div className='flex flex-row gap-3 font-semibold text-neutral-500'>
              <span>|</span>
              {reminderProgress}
            </div>
          </div>

          {/* <Button variant="outline" className='w-fit text-sm'>
              edit reminder
            </Button> */}
          <DialogClose asChild>
            <Button size='icon' className='flex justify-self-end'><HiChevronRight size={20} /></Button>
          </DialogClose>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}


