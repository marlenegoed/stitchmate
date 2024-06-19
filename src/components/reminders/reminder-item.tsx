
import shortenText from '@/lib/shorten-text';
import {type Reminder} from '@/database/queries/queries';
import clsx from 'clsx';
import {TbZzz} from "react-icons/tb";
import ReminderRepeat from './reminder-repeat';

export default function ReminderItem({reminder}: {reminder: Reminder}) {

  const {title, note, notification} = reminder;

  // bg-[#FFFAF0]/50

  return (
    <div className={clsx('h-full', {'opacity-50': !notification})}>
      <div className='flex flex-col justify-between h-full rounded-lg py-3 px-4 w-52 border border-dashed border-black/30'>
        <div className='flex flex-row justify-between self-start'>
          <ReminderRepeat reminder={reminder} className='text-black/40' />
          {!notification && <TbZzz className=' text-black/40' size={20} />}
        </div>
        <h4 className='font-semibold text-lg text-gray-800 mb-2'>{shortenText(title, 38)}</h4>
        <div>
          <p className="text-gray-800 text-lg h-full">{shortenText(note || '', 60)}</p>
        </div>
      </div>
    </div>
  );
};

export function ReminderDefaultItem() {

  return (
    <div className='flex flex-col justify-center text-left h-full rounded-lg py-3 px-4 w-52 border border-dashed border-neutral-400 '>
      <p className='text-xl text-neutral-500 mb-4'>Nothing in here. Add some reminders or notes...</p>
    </div>
  )
}