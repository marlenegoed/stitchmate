'use client'

import SectionProgress from '@/components/sections/section-progress'
import {useDemoStore} from '@/providers/demo-store-provider'

export default function CounterProgress(props: {className?: string}) {

  const numOfRows = useDemoStore(state => state.numOfRows)
  const randomColor = useDemoStore((state) => state.color)

  return <SectionProgress numOfRows={numOfRows} color={randomColor} {...props} />
}