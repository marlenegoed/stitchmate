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
import NumOfRows from '@/components/sections/num-of-rows'
import {ReminderDefaultItem} from '@/components/reminders/reminder-item'
import shortenText from '@/lib/shorten-text'

const DemoCounter = dynamic(() => import('./demo-counter'), {ssr: false, loading: () => <p className='h-full'>Loading...</p>})

const CounterProgress = dynamic(() => import('./counter-progress'), {ssr: false})

export default function DemoCounterPage() {
  return (
    <>
      <Guide />
      <CounterProgress />

      <div className="grid grid-cols-12 grid-rows-12 h-[calc(100dvh_-_4rem)] px-6 pt-2 pb-6 w-full">
        <div className='col-span-3 justify-start'>
          <CounterHeader />
        </div>
        <div className="col-span-6 col-start-4 row-start-1 place-content-center	justify-self-center flex flex-row flex-wrap gap-2">
          <ReminderPrompt />
        </div>
        <div className="row-start-3 row-span-6 col-end-13 justify-self-end">
          <ActionBar />
        </div>
        <div className='col-span-10 row-span-8 row-start-2 col-start-2'>
          <DemoCounter />
        </div>
        <ReminderList />
      </div>
    </>
  )
}


function CounterHeader({className}: {className?: string}) {

  const numOfRows = useDemoStore((state) => state.numOfRows)

  return (
    <div className='flex flex-col items-start w-full gap-2'>
      <TitleField />
      <NumOfRows numOfRows={numOfRows} />
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
    <form onSubmit={onSubmit}>
      <FormItem>
        <Input
          ref={inputRef}
          placeholder='add title'
          variant='inline'
          className='placeholder:text-neutral-500 text-2xl font-semibold max-w-max pl-0'
          name="title"
          value={shortenText(storeTitle, 24)}
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
    <section className={cn('col-start-1 col-span-11 row-start-9 row-span-4 flex flex-row gap-6 items-end h-full', className)}>
      <ScrollArea className="w-fit max-w-full flex">
        <div className='flex flex-row-reverse gap-6 justify-end w-max h-full'>
          {reminders.length === 0 ? <ReminderForm sectionId={0} count={storeCount} onSubmit={onSubmit} isDefaultReminderItem={true} /> :
            reminders.map(reminder => <DemoReminderAlertDialog key={reminder.id} reminder={reminder} />)}
        </div>
        <ScrollBar orientation='horizontal' className="hidden" />
      </ScrollArea>
      <ReminderForm sectionId={0} count={storeCount} onSubmit={onSubmit} />
    </section>
  );
}