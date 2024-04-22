
import shortenText from '@/lib/shorten-text';
import makeOrdinal from '@/lib/make-ordinal';

import {FaEye} from "react-icons/fa6";
import {FaEyeSlash} from "react-icons/fa6";
import {TbZzz} from "react-icons/tb";


export default function Reminder ({reminder}) {

  const {title, note, repeat, type} = reminder;

  const typeEvery = <p className='text-sm font-semibold text-sienna-400'>from row {repeat.start}, every {repeat.interval}{makeOrdinal(repeat.interval)}, {repeat.times} times</p>;

  const typeForRows = <p className='text-sm font-semibold text-sienna-400'>rows {repeat.from} {`\u2013`} {repeat.until}</p>;

  return (
    <div className='flex flex-col justify-between bg-eggshell rounded-xl py-3 px-4 w-40 h-40'>
      <div>
        <h4 className='font-semibold text-slate-800 mb-2'>{title}</h4>
        {type === 'every' ? typeEvery : typeForRows}
      </div>
      <div>
        <p className='text-sm text-neutral-600'>{shortenText(note, 30)}</p>
      </div>
    </div>
  );
};