
import {FaPlus} from "react-icons/fa6";

// import BackgroundBlob from './background-blobs';
// import {useMemo} from 'react';

export default function AddReminder () {

  // const blob = useMemo(() => <BackgroundBlob colorClass='rose-200' stroke={false} className='absolute bottom-3 right-3 fill-white w-24  h-24 opacity-50' />, []);

  return (

    <div className='flex w-40 h-40 bg-neutral-200 rounded-xl p-3'>
      {/* {blob} */}
      <div className='relative z-10'>
        <h4 className='font-semibold'>Add a new reminder</h4>
        <FaPlus size={48} className='fill-neutral-400' />
      </div>
    </div>
  );
}

