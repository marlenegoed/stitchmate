import shortenText from '@/lib/shorten-text';
import BackgroundBlob from '../ui/background-blobs';
import {useMemo} from 'react';

import {FaEye} from "react-icons/fa6";
import {FaEyeSlash} from "react-icons/fa6";
import {TbZzz} from "react-icons/tb";


export default function Reminder ({reminder}) {

  // const blob = useMemo(() => <BackgroundBlob colorClass='rose-200' stroke={false} className='absolute bottom-3 right-3 fill-white w-24 h-24 opacity-50' />, []);

  const {title, note, repeat, type} = reminder;

  const singleClass = 'relative flex w-40 h-40 min-w-40 bg-emerald-300 rounded-xl p-3';

  const typeEvery = `from row ${repeat.start}, repeat every ${repeat.interval} row, ${repeat.times}times.`;
  const typeForRows = `from row ${repeat.from}, repeat until ${repeat.until}.`;

  return (

    <div className={singleClass}>
      {/* {blob} */}
      <div className='relative z-10'>
        {/* {notification === false && <span><TbZzz /></span>} */}
        <h4 className='font-semibold'>{title}</h4>
        <p className='font-semibold text-neutral-100'>{shortenText(note, 30)}</p>
        <p className='font-semibold text-neutral-100'>{type === 'every' ? typeEvery : typeForRows}</p>
      </div>

    </div>
  );


}