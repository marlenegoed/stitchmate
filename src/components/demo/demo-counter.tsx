'use client'

import {BlobCounter} from '@/components/ui/blob-counter';
import {useRandom} from '@/lib/use-random';
import {useCounterStore} from '@/providers/counter-store-provider';
import {useDemoStore} from '@/providers/demo-store-provider';
import {useUserSettingsStore} from '@/providers/user-settings-store-provider';

export default function DemoCounter() {

  const blobIndex = useRandom(8)
  const sound = useUserSettingsStore(state => state.storeSound)
  const {storeCount, countStoreUp} = useCounterStore(state => state)
  const reminders = useDemoStore((state) => state.reminders)
  const randomColor = useDemoStore((state) => state.color)

  function handleClick() {
    countStoreUp()
  }

  return <BlobCounter reminders={reminders} count={storeCount} onClick={handleClick} color={randomColor} blobIndex={blobIndex} sound={sound} />
}