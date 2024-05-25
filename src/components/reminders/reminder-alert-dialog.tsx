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
import ReminderItem from './reminder-item';
import ReminderTag from './reminder-tag';
import {updateReminder, type Reminder} from '@/database/queries/projects';
import {RangeProgress, RepeatProgress} from './reminder-progress';
import ReminderRepeat from './reminder-repeat';
import {TbZzz} from "react-icons/tb";
import {HiChevronRight} from "react-icons/hi2";
import clsx from 'clsx';
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area';
import ReminderForm, {FormValues} from './reminder-form';
import {useCounterStore} from '@/providers/counter-store-provider';
import {useToast} from '@/lib/use-toast';
import {cn} from '@/lib/utils';

interface ReminderAlertDialogProps {
  reminder: Reminder,
  isTag?: boolean,
  className?: string,
}

export default function ReminderAlertDialog({reminder, isTag, className}: ReminderAlertDialogProps) {
  const {toast} = useToast()
  const storeCount = useCounterStore((state) => state.storeCount)

  const {title, note, type, from, until, start, interval, times, notification} = reminder;

  const reminderProgress = type === 'range'
    ? <RangeProgress from={from} until={until} />
    : <RepeatProgress start={start} interval={interval} times={times} />

  async function handleSnooze() {
    const newReminder = {...reminder, notification: !reminder.notification}
    await updateReminder(newReminder)
  }

  async function handleSubmit(values: FormValues) {
    const updatedReminder: Reminder = {...reminder, ...values}
    await updateReminder(updatedReminder)
    toast({title: "Reminder updated"})
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
          <ReminderForm reminder={reminder} count={storeCount} sectionId={reminder.sectionId} isIcon={true} onSubmit={handleSubmit} />
        </DialogHeader>

        <ScrollArea className='h-32 mb-4'>
          <p className='ml-1'>{note}</p>
          <ScrollBar orientation="vertical" className='bg-neutral-200 transition-colors transition-duration-150 ease-out hover:bg-black' />
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
    </Dialog >
  );
}


