'use client'

import {Reminder, UserSettings, setActiveSection, updateCount} from '@/database/queries/projects';
import {useCounterStore} from '@/providers/counter-store-provider'
import {BlobCounter} from '../ui/blob-counter';
import {useUserSettingsStore} from '@/providers/user-settings-store-provider';

interface CounterProps {
  sectionId: number,
  projectColor: string,
  blobIndex: number,
  userSettings: UserSettings,
  reminders: Reminder[]
}

export default function Counter({sectionId, projectColor, blobIndex, reminders}: CounterProps) {
  const {storeCount, countStoreUp} = useCounterStore((state) => state)
  const sound = useUserSettingsStore(state => state.storeSound)

  async function handleClick() {
    countStoreUp()
    await updateCount(sectionId, storeCount + 1)
    await setActiveSection(sectionId)
  }

  return <BlobCounter reminders={reminders} count={storeCount} blobIndex={blobIndex} color={projectColor} onClick={handleClick} sound={sound} />
}