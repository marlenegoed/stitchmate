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
import {AddSectionButton, CloneSectionButton} from '@/components/sections/couter-actions'
import Guide from '@/components/ui/guide'
import NumOfRows from '@/components/sections/num-of-rows'
import shortenText from '@/lib/shorten-text'
import {Button} from '@/components/ui/button'
import {CgMenuGridO} from "react-icons/cg";
import {motion, Variants} from "framer-motion";
import Spinner from '@/components/ui/spinner'


const DemoCounter = dynamic(() => import('./demo-counter'), {ssr: false, loading: () => <Spinner />})

const CounterProgress = dynamic(() => import('./counter-progress'), {ssr: false})

export default function DemoCounterPage() {
  return (
    <>
      <Guide />
      <CounterProgress />
      {/* <CounterMobileHeader className='lg:hidden flex w-full justify-between items-center px-6 pt-2' /> */}

      <div className="grid grid-cols-12 grid-rows-12 h-[calc(100dvh_-_4rem)] px-6 pt-2 pb-6 w-full">

        <div className='col-span-6 sm:col-span-2'>
          <CounterHeader />
        </div>
        <div className="relative z-30 col-span-8 col-start-3 sm:col-span-4 sm:col-start-5 row-span-1 row-start-2 sm:row-start-1 place-content-start justify-center flex flex-row flex-wrap gap-2 mt-4">
          <ReminderPrompt />
        </div>
        <div className="mt-4 relative z-40 row-start-1 row-span-6 col-end-13 justify-self-end mb-auto">
          <ToggleableActionBar />
        </div>
        <div className='col-span-10 row-span-8 sm:row-span-8 row-start-2 col-start-2'>
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
    <div className={cn('flex flex-col items-start w-full gap-2', className)}>
      <TitleField />
      <NumOfRows numOfRows={numOfRows} />
    </div>
  )
}


const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {type: "spring", stiffness: 300, damping: 24}
  },
  closed: {opacity: 0, y: 20, transition: {duration: 0.2}}
};

function ToggleableActionBar() {

  const [isOpen, setIsOpen] = useState(false);

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

    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="flex flex-col gap-4"
    >
      <motion.button
        whileTap={{scale: 0.97}}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-10 w-10 bg-gray-900 flex justify-center items-center rounded-full text-white"><CgMenuGridO /></div>
      </motion.button>

      <motion.ul
        variants={{
          open: {
            // check safari 
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        style={{pointerEvents: isOpen ? "auto" : "none"}}
        className="flex flex-col gap-4"
      >
        <motion.li variants={itemVariants}>
          <CountDownButton reminders={reminders} count={storeCount} sound={storeSound} handleChange={countStoreDown} />
        </motion.li>
        <motion.li variants={itemVariants}>
          <ToggleSound sound={storeSound} onToggle={toggleStoreSound} />
        </motion.li>
        <motion.li variants={itemVariants}>
          <ResetDialog handleReset={resetCounter} />
        </motion.li>
        <motion.li variants={itemVariants}>
          {/* <UserLoginToolTip> */}
          <CloneSectionButton disabled={true} />
          {/* </UserLoginToolTip> */}
        </motion.li>
        <motion.li variants={itemVariants}>
          {/* <UserLoginToolTip> */}
          <AddSectionButton disabled={true} />
          {/* </UserLoginToolTip> */}
        </motion.li>
        <motion.li variants={itemVariants}>
          <DemoSectionDialog />
        </motion.li>
      </motion.ul>
    </motion.nav>

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
          className='placeholder:text-neutral-500 sm:text-2xl text-lg font-semibold max-w-max pl-0'
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
    <section className={cn('col-start-1 col-span-12 row-start-auto row-span-4 flex flex-row gap-6 items-end h-full', className)}>
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