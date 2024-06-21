'use client'

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
import {SlOptionsVertical} from "react-icons/sl";
import {HiOutlineSquare2Stack, HiOutlinePlusCircle} from 'react-icons/hi2';



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
    await updateCount(userSettings.userId, section.id, 1)
    resetCounter()
  }

  return (
    <CounterActionBar>
      <CountDown userId={userSettings.userId} sectionId={section.id} sound={storeSound} reminders={reminders} />
      <ZustandHydration fallback={<ToggleSound sound={userSettings.sound} />}>
        <ToggleSound sound={storeSound} onToggle={handleSoundToggle} />
      </ZustandHydration>

      <ResetDialog handleReset={handleReset} />
      <CloneSection userId={userSettings.userId} section={section} />
      <AddSection userId={userSettings.userId} projectId={section.projectId} position={section.position} />
      <SectionDialog userId={userSettings.userId} section={section} numOfSections={numOfSections} />
    </CounterActionBar>
  )
}




export function CounterActionBar({children}: {children: ReactNode}) {
  return (
    <div className='flex flex-col gap-4 justify-center items-center w-fit text-gray-800 border border-dashed border-neutral-400 rounded-lg px-2 py-3'>
      {children}
    </div>
  )
}

interface AddSectionProps {
  userId: string,
  projectId: number,
  position: number
}

export function AddSection({userId, projectId, position}: AddSectionProps) {
  const {toast} = useToast()
  async function handleNewSection() {
    const newPosition = position + 1
    const newSectionTitle = `Section ${newPosition}`
    await createNewSection(userId, projectId, newPosition, newSectionTitle)
    toast({title: "Section created"})
  }

  return (
    // <Tooltip title="Add section">
    <AddSectionButton onMouseDown={handleNewSection} />
    // </Tooltip>
  )
}

const AddSectionButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
  <Button
    type='button'
    size='icon'
    variant='ghost'
    ref={ref}
    {...props}
  >
    <HiOutlinePlusCircle size={24} />
  </Button>
))
AddSectionButton.displayName = "AddSectionButton"

export function CountDown({userId, sectionId, sound, reminders}: {userId: string, sectionId: number, sound: boolean, reminders: Reminder[]}) {
  const {storeCount, setStoreCount} = useCounterStore(
    (state) => state,
  )

  async function handleCountDown(newCount: number) {
    setStoreCount(newCount)
    await updateCount(userId, sectionId, newCount)
    await setActiveSection(userId, sectionId)
  }

  return <CountDownButton count={storeCount} handleChange={handleCountDown} sound={sound} reminders={reminders} />
}

export function CloneSection({userId, section}: {userId: string, section: Section}) {
  const {toast} = useToast()
  async function handleClick() {
    await cloneSection(userId, section)
    toast({
      title: "Section cloned"
    })
  }

  return (
    // <Tooltip title='Duplicate section'>
    <CloneSectionButton onMouseDown={handleClick} />
    // </Tooltip>
  )
}

const CloneSectionButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
  <Button
    type='button'
    size='icon'
    variant='ghost'
    ref={ref}
    {...props}
  >
    <HiOutlineSquare2Stack size={24} />
  </Button>
))
CloneSectionButton.displayName = "CloneSectionButton"



export {CloneSectionButton, AddSectionButton}