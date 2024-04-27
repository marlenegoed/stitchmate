import React from 'react';
import shortenText from '@/lib/shorten-text';
import makeOrdinal from '@/lib/make-ordinal';
import type { ReminderType } from './reminder_def';

interface ReminderProps {
  reminder: ReminderType;
}


const Reminder = React.forwardRef<HTMLDivElement, ReminderProps>(({ reminder }, ref) => {
  const { title, note, repeat, type } = reminder;
  const typeEvery = <p className='text-sm font-semibold text-sienna-500'>from row {repeat.start}, every {repeat.interval}{makeOrdinal(repeat.interval)}, {repeat.times} times</p>;
  const typeForRows = <p className='text-sm font-semibold text-sienna-500'>rows {repeat.from} {`\u2013`} {repeat.until}</p>;

  return (
    <div className='flex flex-col justify-between bg-eggshell/70 rounded-xl py-3 px-4 w-40 h-40'>
      <div>
        <h4 className='font-semibold text-slate-800 mb-2'>{title}</h4>
        {type === 'every' ? typeEvery : typeForRows}
      </div>
      <div>
        <p className='text-sm text-neutral-600'>{shortenText(note, 30)}</p>
      </div>
    </div>
  );
});

Reminder.displayName = 'Reminder';

export default Reminder;