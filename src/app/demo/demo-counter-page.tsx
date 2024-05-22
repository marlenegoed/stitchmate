'use client'

import {Button} from '@/components/ui/button'
import {FormItem} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {DemoStoreProvider, useDemoStore} from '@/providers/demo-store-provider'
import {FormEvent, ReactNode, useEffect, useRef, useState} from 'react'
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineDocumentDuplicate,
  HiOutlinePlusCircle
} from 'react-icons/hi2';
import ResetDemoDialog from '@/components/demo/demo-reset-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import DemoSectionDialog from '@/components/demo/demo-section-dialog'
import clsx from 'clsx'
import {Progress} from '@/components/ui/progress'
import findNextReminders from '@/lib/find-next-reminders'
import DemoReminderAlertDialog from '@/components/demo/demo-reminder-alert-dialog'
import dynamic from 'next/dynamic'
import {ToggleSound} from '@/components/ui/toggle-sound-button'
import {CountDownButton} from '@/components/ui/count-down-button'
import ReminderAlertDialog from '@/components/reminders/reminder-alert-dialog'
import ReminderForm, {FormValues} from '@/components/reminders/reminder-form'
import {ScrollBar} from '@/components/ui/scroll-area'
import {Reminder, NewReminder} from '@/database/queries/projects'
import {ScrollArea} from '@radix-ui/react-scroll-area'

const DemoCounter = dynamic(() => import('./demo-counter'), {ssr: false, loading: () => <p>Loading...</p>})

export function DemoCounterPage() {
  return (
    <DemoStoreProvider>
      <div className='flex justify-between w-full px-6'>
        <TitleField />
        <ActionBar />
      </div>
      <SectionProgress />
      <DemoCounter />

      <section className='flex w-full mt-auto mb-4 px-6'>
        <ReminderList />
      </section>
    </DemoStoreProvider>
  )
}

function ActionBar() {

  const {storeCount, countStoreDown, sound, toggleSound} = useDemoStore((state) => state)

  return (
    <div className='flex flex-row items-center gap-6'>
      <CountDownButton count={storeCount} sound={sound} handleChange={countStoreDown} />
      <ToggleSound sound={sound} onToggle={toggleSound} />

      <ResetDemoDialog setOpen={() => true} />
      <UserLoginInfo>
        <Button type='button' size='icon' variant='ghost' className='border-slate-800 opacity-30'>
          <HiOutlineDocumentDuplicate size={24} />
        </Button>
      </UserLoginInfo>

      <UserLoginInfo>
        <Button type='button' size='icon' variant='ghost' className='border-slate-800 opacity-30'>
          <HiOutlinePlusCircle size={24} />
        </Button>
      </UserLoginInfo>
      <DemoSectionDialog />

      <UserLoginInfo>
        <div className='flex flex-row text-slate-700'>
          <Button size='icon' variant='ghost' className='opacity-30'><HiChevronLeft size={24} /></Button>
          <Button size='icon' variant='ghost' className='opacity-30'><HiChevronRight size={24} /></Button>
        </div>
      </UserLoginInfo>

    </div>
  )
}

function TitleField() {
  const inputRef = useRef<HTMLInputElement>(null)

  const {storeTitle, setStoreTitle} = useDemoStore(
    (state) => state,
  )

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!storeTitle) setStoreTitle("My Counter")
    inputRef.current?.blur()
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <FormItem>
        <Input
          ref={inputRef}
          placeholder='currentTitle'
          variant='inline'
          className='placeholder:text-slate-800 font-semibold text-xl'
          name="title"
          value={storeTitle}
          onChange={(e) => setStoreTitle(e.target.value)}
        />
      </FormItem>
    </form>
  )

}


interface UserLoginInfoProps {
  children: ReactNode,
}

function UserLoginInfo({children}: UserLoginInfoProps) {

  return (

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>sign in for all features</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}




function SectionProgress() {

  const {storeCount, numOfRows} = useDemoStore(state => state)

  const [progress, setProgress] = useState(numOfRows);

  const isNumOfRows = numOfRows > 0

  useEffect(() => {
    if (numOfRows > 0) {
      setProgress(Math.min(storeCount / numOfRows * 100, 100));
    } else {
      setProgress(0);
    }
  }, [numOfRows, storeCount]);

  return (
    <>
      <Progress value={progress} className={clsx('w-full', {'invisible': !isNumOfRows})} />
      <div className='flex flex-col items-end w-full px-6 pt-2'>
        <span className={clsx('font-semibold bg-white text-slate-700 rounded-full shadow-sm px-4 py-1', {'invisible': !isNumOfRows})}>{numOfRows}</span>
      </div>
    </>
  );
}


function ReminderPrompt() {

  const {storeCount, reminders} = useDemoStore(
    (state) => state,
  )
  const nextReminders = findNextReminders(reminders, storeCount)

  return (
    <div className="flex gap-4 -mt-4">
      {nextReminders.map(reminder => <DemoReminderAlertDialog key={reminder.id} reminder={reminder} isTag={true} />)}
    </div>
  );
}


export default function ReminderList() {
  const {storeCount, setReminder, reminders} = useDemoStore((state) => state)

  async function onSubmit(values: FormValues) {
    const newReminder: NewReminder = {...values, sectionId: 0}
    setReminder(newReminder)
  }

  return (
    <section className='w-full flex flex-row gap-4 justify-end'>
      <ScrollArea className="w-full">
        <div className='flex flex-row-reverse gap-4 justify-end w-max'>
          {reminders.map(reminder => <DemoReminderAlertDialog key={reminder.id} reminder={reminder} />)}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      <ReminderForm sectionId={0} count={storeCount} onSubmit={onSubmit} />
    </section>
  );
}