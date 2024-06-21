
import shortenText from '@/lib/shorten-text';
import {type Reminder} from '@/database/queries/queries';
import clsx from 'clsx';
import {TbZzz} from "react-icons/tb";
import ReminderRepeat from './reminder-repeat';

export default function ReminderItem({reminder}: {reminder: Reminder}) {

  const {title, note, notification} = reminder;

  return (
    <div className={clsx({'opacity-50': !notification})}>
      <div className='min-h-52 flex flex-col h-full rounded-lg py-3 px-4 w-52 border border-dashed border-black/30'>
        <div className='flex flex-row justify-between w-full'>
          {/* <ReminderRepeat reminder={reminder} className='rounded-full bg-sienna-100 text-sienna-400 text-xs font-semibold px-2 py-1' /> */}
          <ReminderRepeat reminder={reminder} className='text-neutral-500 rounded-full text-sm py-1 font-normal' />

          {!notification && <TbZzz className=' text-neutral-500' size={20} />}
        </div>
        <h4 className='font-medium text-xl text-neutral-500 mb-2'>{shortenText(title, 38)}</h4>
        <p className="font-normal text-sm text-gray-500 mt-auto h-16 mb-auto">{shortenText(note || '', 60)}</p>
      </div>
    </div>
  );
};

export function ReminderDefaultItem() {

  return (
    <div className='flex flex-col justify-center text-left h-full rounded-lg py-3 px-4 w-52 border border-dashed border-neutral-400'>
      <p className='text-xl text-neutral-500 mb-4'>Nothing in here. Add your reminders and notes...</p>
    </div>
  )
}