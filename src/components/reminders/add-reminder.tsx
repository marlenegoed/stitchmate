
import {HiOutlinePlus} from "react-icons/hi";
import Link from 'next/link';
import {Button} from '../ui/button';

// import BackgroundBlob from './background-blobs';
// import {useMemo} from 'react';

export default function AddReminder({sectionId}: {sectionId: number}) {
  // const blob = useMemo(() => <BackgroundBlob colorClass='rose-200' stroke={false} className='absolute bottom-3 right-3 fill-white w-24  h-24 opacity-50' />, []);

  return (
    <div className='hover:opacity-80 hover:cursor-pointer relative z-20 w-24 min-h-52 flex items-center justify-center rounded-lg border border-dashed border-neutral-400'>
      <div className="border border border-dashed border-neutral-400 rounded-full w-12 h-12 flex items-center justify-center">
        <HiOutlinePlus className='text-neutral-400' size={20} />
      </div>
    </div>
  );
}

