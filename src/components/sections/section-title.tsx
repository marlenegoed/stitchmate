'use client'

import {updateSectionTitle} from '@/database/queries/queries'
import TitleInput from '../ui/title-input'
import {useCounterStore} from '@/providers/counter-store-provider'
import {FieldValues} from 'react-hook-form'

interface SectionTitleProps {
  userId: string,
  id: number,
  // title={section.title}
}

export default function SectionTitle({userId, id}: SectionTitleProps) {

  const {storeTitle, setStoreTitle} = useCounterStore(state => state)

  async function handleSubmit(data: FieldValues) {

    await updateSectionTitle(userId, id, data.title)
    setStoreTitle(data.title)
  }

  return <TitleInput handleSubmit={handleSubmit} title={storeTitle} />

}