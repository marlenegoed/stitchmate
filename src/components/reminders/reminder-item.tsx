
import shortenText from '@/lib/shorten-text';
import {type Reminder} from '@/database/queries/projects';
import clsx from 'clsx';
import {TbZzz} from "react-icons/tb";
import ReminderRepeat from './reminder-repeat';

export default function ReminderItem({reminder}: {reminder: Reminder}) {

  const {title, note, notification} = reminder;

  // bg-[#FFFAF0]/50

  return (
    <div className={clsx({'opacity-50': !notification})}>
      <div className='flex flex-col justify-between bg-eggshell rounded-xl py-3 px-4 w-40 h-40 shadow'>
        <div className='flex flex-row justify-between'>
          <ReminderRepeat reminder={reminder} className='text-sm text-sienna-400/70' />
          {!notification && <TbZzz className='mt-1 text-sienna-400' />}
        </div>
        <div>
          <h4 className='font-semibold text-slate-700 mb-2'>{shortenText(title, 15)}</h4>

          <p className='text-sm text-neutral-600'>{shortenText(note || '', 30)}</p>
        </div>
      </div>
    </div>
  );
};