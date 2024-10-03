'use client'

import TitleInput from '../ui/title-input'
import {useDemoStore} from '@/providers/demo-store-provider'
import {FieldValues} from 'react-hook-form'

export default function DemoSectionTitle() {

  const {title, setTitle} = useDemoStore(state => state)
  console.log(title)

  function handleSubmit(data: FieldValues) {
    setTitle(data.title)
  }

  return (
    <TitleInput handleSubmit={handleSubmit} title={title} />
  )
}
