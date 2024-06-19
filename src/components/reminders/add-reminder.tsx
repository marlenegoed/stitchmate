
import {HiOutlinePlus} from "react-icons/hi";
import Link from 'next/link';
import {Button} from '../ui/button';

// import BackgroundBlob from './background-blobs';
// import {useMemo} from 'react';

export default function AddReminder({sectionId}: {sectionId: number}) {
  // const blob = useMemo(() => <BackgroundBlob colorClass='rose-200' stroke={false} className='absolute bottom-3 right-3 fill-white w-24  h-24 opacity-50' />, []);

  return (
    <div className='hover:cursor-pointer hover:bg-gray-800 hover:transition-colors relative w-20 sm:w-40 h-40 flex bg-sienna-300 sm:flex-col rounded-xl py-3 px-4 shadow-sm justify-center sm:justify-between'>
      <HiOutlinePlus className='-mt-2 sm:-mt-0 self-center sm:self-start' size={30} />
      <h4 className='text-left font-semibold hidden mr-10 sm:inline'>Add reminder</h4>
      {/* <p className='text-viridian-800 sm:self-end text-3xl'>+</p> */}
    </div>
  );
}

