
import shortenText from '@/lib/shorten-text';
import makeOrdinal from '@/lib/make-ordinal';
import {type Reminder} from '@/lib/reminder';

export default function ReminderItem({reminder}: {reminder: Reminder}) {

  const {title, note, repeat} = reminder;

  const descriptionType = repeat.type === 'every'
    ? <p className='text-sm font-semibold text-sienna-500'>from row {repeat.start}, every {repeat.interval}{makeOrdinal(repeat.interval)}, {repeat.times} times</p>
    : <p className='text-sm font-semibold text-sienna-500'>rows {repeat.from} {`\u2013`} {repeat.until}</p>

  return (
    <div className='flex flex-col justify-between bg-eggshell/70 rounded-xl py-3 px-4 w-40 h-40'>
      <div>
        <h4 className='font-semibold text-slate-800 mb-2'>{title}</h4>
        {descriptionType}
      </div>
      <div>
        <p className='text-sm text-neutral-600'>{shortenText(note, 30)}</p>
      </div>
    </div>
  );
};