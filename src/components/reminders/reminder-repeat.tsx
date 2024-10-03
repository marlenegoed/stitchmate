import {type Reminder} from '@/database/queries/queries'
import makeOrdinal from '../../lib/make-ordinal'
import {cn} from '@/lib/utils'

interface ReminderRepeatProps {
  reminder: Reminder,
  className?: string
}


export default function ReminderRepeat({reminder, className}: ReminderRepeatProps) {

  const styles = 'text-base font-semibold text-sienna-400/70'

  if (reminder.type === 'range') {

    if (reminder.until! - reminder.from! === 0) {
      return <p className={cn(styles, className)}>row {reminder.from}</p>
    }
    return <p className={cn(styles, className)}>rows {reminder.from} {`\u2013`} {reminder.until}</p>
  }

  return <p className={cn(styles, className)}>
    {/* <span className='px-3'>|</span> */}
    <span> every {reminder.interval}{makeOrdinal(reminder.interval || 0)}</span> </p>
}
