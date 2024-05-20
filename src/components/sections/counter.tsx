'use client'

import {useMemo} from 'react';
import useSound from 'use-sound';
import BackgroundBlob from '../ui/background-blobs';
import {UserSettings, setActiveSection, updateCount} from '@/database/queries/projects';
import {useCounterStore} from '@/providers/counter-store-provider'
import {BlobCounter} from './blob-counter';

interface CounterProps {
  sectionId: number,
  projectColor: string,
  blobIndex: number,
  userSettings: UserSettings
}

export default function Counter({sectionId, projectColor, userSettings, blobIndex}: CounterProps) {
  const [play] = useSound('/click-2.mp3', {interrupt: true});

  const {storeCount, countStoreUp} = useCounterStore((state) => state,)

  async function handleClick() {
    countStoreUp()
    await updateCount(sectionId, storeCount + 1)
    await setActiveSection(sectionId)
    if (userSettings.sound) play()
  }

  return <BlobCounter count={storeCount} blobIndex={blobIndex} color={projectColor} onClick={handleClick} />
}