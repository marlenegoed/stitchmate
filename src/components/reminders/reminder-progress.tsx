import {cn} from '@/lib/utils'
import {useCounterStore} from '@/providers/counter-store-provider'
import {HiCheck} from 'react-icons/hi'

interface RangeProgressProps {
  from: number | null,
  until: number | null,
  className?: string,
}
export function RangeProgress({from, until, className}: RangeProgressProps) {

  const {storeCount} = useCounterStore(
    (state) => state,
  )
  // validate input
  if (!from || !until) return

  const rowsRequired = until - from + 1

  if (rowsRequired === 1 && storeCount === from) {
    return <p className={cn(className)}>| <HiCheck size={24} className='text-neutral-500'/></p>
  }

  let rowsKnitted = 0

  if (storeCount >= from || storeCount < until) {
    rowsKnitted = until - storeCount
  }

  if (storeCount >= until) return <p className={cn(className)}><HiCheck size={24} className='text-neutral-500'/></p>

  return <p className={cn(className)}>| {rowsKnitted} / {rowsRequired}</p>
}



interface RepeatProgressProps {
  start: number | null | undefined,
  interval: number | null | undefined,
  times: number | null | undefined,
  className?: string
}
export function RepeatProgress({start, interval, times, className}: RepeatProgressProps) {

  const {storeCount} = useCounterStore(
    (state) => state,
  )

  // validate input
  if (!start || !interval || !times) return

  const rowsFromStart = storeCount - start + 1
  let repeatsDone = Math.floor(rowsFromStart / interval)

  if (rowsFromStart < 0) repeatsDone = 0

  if (repeatsDone === times) <p className={cn(className)}><HiCheck /></p>

  return <p className={cn(className)}>{repeatsDone} / {times}</p>

}
