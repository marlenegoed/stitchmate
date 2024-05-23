'use client'

import {HiArrowRightOnRectangle, HiOutlineBookmarkSquare} from "react-icons/hi2";
import {HiOutlineDocumentDuplicate} from "react-icons/hi2";
import {HiOutlineSquare2Stack} from "react-icons/hi2";

import {Section, UserSettings, cloneSection, createNewSection, setActiveSection, toggleSound} from '@/database/queries/projects';
import {Button} from '../ui/button';
import Link from 'next/link';
import {updateCount} from '@/database/queries/projects';
import {useCounterStore} from '@/providers/counter-store-provider';
import SectionDialog from './section-dialog';
import ResetDialog from './reset-dialog';
// import {HiOutlinePlusCircle} from "react-icons/hi2";
import {ToggleSound} from '../ui/toggle-sound-button';
import {CountDownButton} from '../ui/count-down-button';
import {useUserSettingsStore} from '@/providers/user-settings-store-provider';
import ZustandHydration from '../store/zustand-hydration';
import {Tooltip} from '../ui/tooltip';
import {useToast} from '@/lib/use-toast';


interface CounterActionProps {
  section: Section,
  userSettings: UserSettings
}

export default function CounterActions({section, userSettings}: CounterActionProps) {
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
    <div className='grid grid-cols-6 gap-6 text-slate-700 opactiy-80 justify-items-center	'>
      <CountDown sectionId={section.id} sound={storeSound} />
      <ZustandHydration fallback={<ToggleSound sound={userSettings.sound} />}>
        <ToggleSound sound={storeSound} onToggle={handleSoundToggle} />
      </ZustandHydration>

      <ResetDialog handleReset={handleReset} />
      <CloneSection section={section} />
      <AddSection projectId={section.projectId} position={section.position} />
      <SectionDialog section={section} />
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
      <Button type='button' size='icon' variant='ghost' className='border-slate-800  hover:bg-neutral-200 hover:bg-opacity-80 transition-colors' onClick={handleNewSection}>
        <HiArrowRightOnRectangle size={24} />
      </Button>
    </Tooltip>
  )
}


export function CountDown({sectionId, sound}: {sectionId: number, sound: boolean}) {
  const {storeCount, setStoreCount} = useCounterStore(
    (state) => state,
  )

  async function handleCountDown(newCount: number) {
    setStoreCount(newCount)
    await updateCount(sectionId, newCount)
    await setActiveSection(sectionId)
  }

  return <CountDownButton count={storeCount} handleChange={handleCountDown} sound={sound} />
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
      <Button type='button' size='icon' variant='ghost' className='border-slate-800  hover:bg-neutral-200 hover:bg-opacity-80 transition-colors' onClick={handleClick}>
        <HiOutlineSquare2Stack size={24} />
      </Button>
    </Tooltip>
  )
}

export function AddReminderButton({sectionId}: {sectionId: number}) {
  return (
    <Link href={`/sections/${sectionId}/reminder/new`}>
      <Button type='button' size='icon' variant='ghost' className='border-slate-800'>
        <HiOutlineBookmarkSquare size={24} />
      </Button>
    </Link>
  )
}