'use client'

import {FormItem} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {useDemoStore} from '@/providers/demo-store-provider'
import {FormEvent, ReactNode, useRef, useState} from 'react'
import {Tooltip} from "@/components/ui/tooltip"
import DemoSectionDialog from '@/components/demo/demo-section-dialog'
import findNextReminders from '@/lib/find-next-reminders'
import DemoReminderAlertDialog from '@/components/demo/demo-reminder-alert-dialog'
import dynamic from 'next/dynamic'
import {ToggleSound} from '@/components/ui/toggle-sound-button'
import {CountDownButton} from '@/components/ui/count-down-button'
import ReminderForm, {FormValues} from '@/components/reminders/reminder-form'
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area'
import {type NewReminder} from '@/database/queries/queries'
import {useCounterStore} from '@/providers/counter-store-provider'
import {useUserSettingsStore} from '@/providers/user-settings-store-provider'
import ResetDialog from '@/components/sections/reset-dialog'
import {cn} from '@/lib/utils'
import SectionProgress from '@/components/sections/section-progress'
import {AddSectionButton, CloneSectionButton, CounterActionBar} from '@/components/sections/couter-actions'
import Guide from '@/components/ui/guide'

const DemoCounter = dynamic(() => import('./demo-counter'), {ssr: false, loading: () => <p className='h-full'>Loading...</p>})

export default function DemoCounterPage() {
  return (
    <>
      <Guide />
      <CounterHeader className="max-w-6xl" />
      <CounterProgress className='max-w-6xl' />

      <section className='max-w-6xl w-full flex-1 flex-col flex justify-center items-center mb-4 relative' >
        <div className='mb-auto'>
          <DemoCounter />
        </div>
        <div className='absolute max-w-40 s:max-w-m md:max-w-md l:max-w-xl xl:max-w-3xl min-h-10 flex flex-wrap justify-center gap-4 -top-8'>
          <ReminderPrompt className='z-10' />
        </div>
      </section>
      <ReminderList className='max-w-6xl' />
    </>
  )
}

function CounterHeader({className}: {className?: string}) {
  return (
    <div className={cn('w-full', className)}>
      <div className='grid grid-cols-12 items-center mb-4'>
        <div className='hidden col-span-6 flex-row items-center w-full ml-6 sm:flex '>
          <TitleField />
        </div>

        <div className='col-span-6 flex flex-row justify-end'>
          <div className='lg:flex flex-row hidden items-center gap-6 mr-6'>
            <ActionBar />
          </div>
        </div>

        {/* action bar mobile:  */}
        <div className='justify-self-center self-center lg:hidden col-span-12 my-1 mx-6 bg-white rounded-full shadow-sm py-2 px-4 max-w-fit '>
          <ActionBar />
        </div>
      </div>
    </div>
  )
}

function ActionBar() {
  const {storeSound, toggleStoreSound} = useUserSettingsStore(state => state)
  const {storeCount, countStoreDown} = useCounterStore(state => state)

  const resetCounterStore = useCounterStore(state => state.reset)
  const resetDemoStore = useDemoStore((state) => state.resetStore)
  const reminders = useDemoStore((state) => state.reminders)

  async function resetCounter() {
    resetDemoStore()
    resetCounterStore()
  }

  return (
    <CounterActionBar>
      <CountDownButton reminders={reminders} count={storeCount} sound={storeSound} handleChange={countStoreDown} />
      <ToggleSound sound={storeSound} onToggle={toggleStoreSound} />

      <ResetDialog handleReset={resetCounter} />
      <UserLoginToolTip>
        <CloneSectionButton disabled={true} />
      </UserLoginToolTip>

      <UserLoginToolTip>
        <AddSectionButton disabled={true} />
      </UserLoginToolTip>

      <DemoSectionDialog />
    </CounterActionBar>
  )
}

function TitleField() {
  const inputRef = useRef<HTMLInputElement>(null)

  const {storeTitle, setStoreTitle} = useCounterStore((state) => state)
  const [defaultTitle, setDefaultTitle] = useState(storeTitle)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (storeTitle) {
      setDefaultTitle(storeTitle)
    } else {
      setStoreTitle(defaultTitle)
    }
    inputRef.current?.blur()
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <FormItem>
        <Input
          ref={inputRef}
          placeholder='add title'
          variant='inline'
          className='placeholder:text-neutral-500 text-2xl font-semibold max-w-max pl-0'
          name="title"
          value={storeTitle}
          onChange={(e) => setStoreTitle(e.target.value)}
        />
      </FormItem>
    </form>
  )

}

function UserLoginToolTip({children}: {children: ReactNode}) {
  return (
    <Tooltip title="Sign in for all features">
      {children}
    </Tooltip>
  )
}

function CounterProgress(props: {className?: string}) {
  const numOfRows = useDemoStore(state => state.numOfRows)
  return <SectionProgress numOfRows={numOfRows} {...props} />
}

function ReminderPrompt(props: {className?: string}) {
  const storeCount = useCounterStore(state => state.storeCount)
  const reminders = useDemoStore((state) => state.reminders)
  const nextReminders = findNextReminders(reminders, storeCount)

  return nextReminders.map(reminder =>
    <DemoReminderAlertDialog key={reminder.id} reminder={reminder} isTag={true} {...props} />
  )
}

function ReminderList({className}: {className?: string}) {
  const storeCount = useCounterStore(state => state.storeCount)
  const {setReminder, reminders} = useDemoStore((state) => state)

  async function onSubmit(values: FormValues) {
    const newReminder: NewReminder = {...values, sectionId: 0}
    setReminder(newReminder)
  }

  return (
    <section className={cn('w-full flex flex-row gap-4 justify-end mt-auto mb-4 px-6', className)}>
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