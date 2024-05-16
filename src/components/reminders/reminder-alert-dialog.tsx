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
import ReminderItem from './reminder-item';
import ReminderTag from './reminder-tag';
import Link from 'next/link';
import {updateReminder, type Reminder} from '@/database/queries/projects';
import {RangeProgress, RepeatProgress} from './reminder-progress';
import ReminderRepeat from './reminder-repeat';
import {TbZzz} from "react-icons/tb";
import {HiAdjustmentsVertical} from "react-icons/hi2";
import {HiChevronRight} from "react-icons/hi2";
import clsx from 'clsx';
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area';




interface ReminderAlertDialogProps {
  reminder: Reminder,
  isTag?: boolean,
}

export default function ReminderAlertDialog({reminder, isTag}: ReminderAlertDialogProps) {

  const {id, title, note, type, from, until, start, interval, times, notification} = reminder;

  const reminderProgress = type === 'range' ? <RangeProgress className='font-semibold text-slate-700' from={from} until={until} /> : <RepeatProgress className='font-semibold text-slate-700' start={start} interval={interval} times={times} />

  async function handleSnooze() {
    const newReminder = {...reminder, notification: !reminder.notification}
    updateReminder(newReminder)
    console.log('switched')
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
        <DialogHeader className='-mt-2 mb-2 flex flex-row justify-between mr-12 gap-6'>
          <DialogTitle className='ml-1 mb-2 text-xl'>{title}</DialogTitle>
          <div className='flex flex-row gap-6'>
            <TbZzz onClick={handleSnooze} size={20} className={clsx('transition-colors cursor-pointer', {'text-sienna-400 hover:text-sienna-500': !notification, 'text-neutral-500 hover:text-sienna-400': notification})} />
            <Link href={`/reminders/${id}/edit`}>
              <HiAdjustmentsVertical className='text-slate-800 hover:text-slate-950' size={20} />
            </ Link>
          </div>
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


