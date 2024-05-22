
import {IoAdd} from "react-icons/io5";
import Link from 'next/link';

// import BackgroundBlob from './background-blobs';
// import {useMemo} from 'react';

export default function AddReminder({sectionId}: {sectionId: number}) {
  // const blob = useMemo(() => <BackgroundBlob colorClass='rose-200' stroke={false} className='absolute bottom-3 right-3 fill-white w-24  h-24 opacity-50' />, []);

  return (
    <div className='hover:cursor-pointer hover:bg-viridian-300/75 transition-colors relative z-10 w-20 sm:w-40 h-40 flex bg-viridian-200 rounded-xl py-3 px-4 pb-6 shadow-sm justify-center'>
      <h4 className='text-left font-semibold text-viridian-900 hidden sm:inline'>Add reminder</h4>
      {/* <p className='text-viridian-800 sm:self-end text-3xl'>+</p> */}
      <IoAdd className='text-viridian-900 self-center sm:self-end' size={30} />
    </div>
  );
}

