
import shortenText from '@/lib/shorten-text';
import {type Reminder} from '@/database/queries/projects';
import clsx from 'clsx';
import {TbZzz} from "react-icons/tb";
import ReminderRepeat from './reminder-repeat';




export default function ReminderItem({reminder}: {reminder: Reminder}) {

  const {title, note, notification} = reminder;

  return (
    <div className={clsx({'opacity-50': !notification})}>
      <div className='flex flex-col justify-between bg-eggshell/70 rounded-xl py-3 px-4 w-40 h-40'>
        <div className='flex flex-row justify-between'>
          <h4 className='font-semibold text-slate-800 mb-2'>{title}</h4>
          {!notification && <TbZzz className='mt-1 text-viridian-800' />}
        </div>
        <ReminderRepeat reminder={reminder} />
        <div>
          <p className='text-sm text-neutral-600'>{shortenText(note || '', 30)}</p>
        </div>
      </div>
    </div>
  );
};