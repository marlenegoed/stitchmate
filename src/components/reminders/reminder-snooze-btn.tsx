import {TbZzz} from 'react-icons/tb';
import {Button} from '../ui/button';
import clsx from 'clsx';
import {Reminder} from '@/database/queries/queries';
import {cn} from '@/lib/utils';
import {Dispatch, SetStateAction, useState} from 'react';
import {Switch} from '../ui/switch';
import {Label} from '../ui/label';


interface SnoozeReminderProps {
  handleSnooze: () => void,
  snoozed: boolean,
  className?: string,
  setSnoozed: Dispatch<SetStateAction<boolean>>,
}

export default function SnoozeReminder({handleSnooze, snoozed, setSnoozed, className}: SnoozeReminderProps) {
  // const [snoozed, setSnoozed] = useState(snooyed)

  function handleClick() {
    handleSnooze()
    setSnoozed(!snoozed)
  }

  return (
    <>
      <div className='flex flex-row justify-between'>
        <Label
          htmlFor='snooze-reminder'
          className='font-medium'
        >
          notification
        </Label>
        <Switch
          id='snooze-reminder'
          defaultChecked={snoozed}
          onCheckedChange={handleClick}
          className='data-[state=checked]:bg-sienna-300 data-[state=unchecked]:bg-neutral-200' />
      </div>
      <p className='text-sm mt-2'>when enabled a note gets displayed above your blob counter once you hit the reminder row.</p>
    </>
  )


}