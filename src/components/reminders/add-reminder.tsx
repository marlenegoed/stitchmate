
import {IoAdd} from "react-icons/io5";
import Link from 'next/link';

// import BackgroundBlob from './background-blobs';
// import {useMemo} from 'react';

export default function AddReminder({sectionId}: {sectionId: number}) {
  // const blob = useMemo(() => <BackgroundBlob colorClass='rose-200' stroke={false} className='absolute bottom-3 right-3 fill-white w-24  h-24 opacity-50' />, []);

  return (
    <div className='hover:cursor-pointer hover:bg-viridian-300 transition-colors relative z-10 w-40 h-40 flex bg-viridian-200 rounded-xl py-3 px-4 pb-6 shadow-sm'>
      <h4 className='font-semibold text-slate-800'>add reminder</h4>
      <IoAdd className='text-slate-800 self-end' size={24} />
    </div>
  );
}

