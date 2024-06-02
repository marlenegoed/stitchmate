'use client'

import {HiArrowRightOnRectangle} from "react-icons/hi2";
import {HiOutlineSquare2Stack} from "react-icons/hi2";
import {Reminder, Section, UserSettings, cloneSection, createNewSection, setActiveSection, toggleSound} from '@/database/queries/queries';
import {Button} from '../ui/button';
import {updateCount} from '@/database/queries/queries';
import {useCounterStore} from '@/providers/counter-store-provider';
import SectionDialog from './section-dialog';
import ResetDialog from './reset-dialog';
import {ToggleSound} from '../ui/toggle-sound-button';
import {CountDownButton} from '../ui/count-down-button';
import {useUserSettingsStore} from '@/providers/user-settings-store-provider';
import ZustandHydration from '../store/zustand-hydration';
import {Tooltip} from '../ui/tooltip';
import {useToast} from '@/lib/use-toast';
import {ButtonHTMLAttributes, ReactNode, forwardRef} from 'react';


interface CounterActionProps {
  section: Section,
  userSettings: UserSettings,
  numOfSections: number,
  reminders: Reminder[]
}

export default function CounterActions({section, userSettings, numOfSections, reminders}: CounterActionProps) {
  const {storeSound, toggleStoreSound} = useUserSettingsStore(state => state)
  const resetCounter = useCounterStore(state => state.reset)
  async function handleSoundToggle() {
    toggleStoreSound()
    await toggleSound(userSettings.userId)
  }

  async function handleReset() {
    await updateCount(section.id, 1)
    resetCounter()
  }

  return (
    <CounterActionBar>
      <CountDown sectionId={section.id} sound={storeSound} reminders={reminders} />
      <ZustandHydration fallback={<ToggleSound sound={userSettings.sound} />}>
        <ToggleSound sound={storeSound} onToggle={handleSoundToggle} />
      </ZustandHydration>

      <ResetDialog handleReset={handleReset} />
      <CloneSection section={section} />
      <AddSection projectId={section.projectId} position={section.position} />
      <SectionDialog section={section} numOfSections={numOfSections} />
    </CounterActionBar>
  )
}

export function CounterActionBar({children}: {children: ReactNode}) {
  return (
    <div className='grid grid-cols-6 gap-6 text-slate-700 opactiy-80 justify-items-center	'>
      {children}
    </div>
  )
}

interface AddSectionProps {
  projectId: number,
  position: number
}

export function AddSection({projectId, position}: AddSectionProps) {
  const {toast} = useToast()
  async function handleNewSection() {
    const newPosition = position + 1
    const newSectionTitle = `Section ${newPosition}`
    await createNewSection(projectId, newPosition, newSectionTitle)
    toast({title: "Section created"})
  }

  return (
    <Tooltip title="Add section">
      <AddSectionButton onMouseDown={handleNewSection} />
    </Tooltip>
  )
}

const AddSectionButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
  <Button
    type='button'
    size='icon'
    variant='ghost'
    className='border-slate-800  hover:bg-neutral-200 hover:bg-opacity-80 transition-colors'
    ref={ref}
    {...props}
  >
    <HiArrowRightOnRectangle size={24} />
  </Button>
))
AddSectionButton.displayName = "AddSectionButton"

export function CountDown({sectionId, sound, reminders}: {sectionId: number, sound: boolean, reminders: Reminder[]}) {
  const {storeCount, setStoreCount} = useCounterStore(
    (state) => state,
  )

  async function handleCountDown(newCount: number) {
    setStoreCount(newCount)
    await updateCount(sectionId, newCount)
    await setActiveSection(sectionId)
  }

  return <CountDownButton count={storeCount} handleChange={handleCountDown} sound={sound} reminders={reminders} />
}

export function CloneSection({section}: {section: Section}) {
  const {toast} = useToast()
  async function handleClick() {
    await cloneSection(section)
    toast({
      title: "Section cloned"
    })
  }

  return (
    <Tooltip title='Duplicate section'>
      <CloneSectionButton onMouseDown={handleClick} />
    </Tooltip>
  )
}

const CloneSectionButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
  <Button
    type='button'
    size='icon'
    variant='ghost'
    className='border-slate-800 hover:bg-neutral-200 hover:bg-opacity-80 transition-colors'
    ref={ref}
    {...props}
  >
    <HiOutlineSquare2Stack size={24} />
  </Button>
))
CloneSectionButton.displayName = "CloneSectionButton"

export {CloneSectionButton, AddSectionButton}