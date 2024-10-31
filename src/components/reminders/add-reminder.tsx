
import {HiOutlinePlus} from "react-icons/hi";

export default function AddReminder() {

  return (
    <div className='hover:opacity-80 hover:cursor-pointer relative z-20 w-24 min-h-52 flex items-center justify-center rounded-lg border border-dashed border-neutral-400'>
      <div className="border border border-dashed border-neutral-400 rounded-full w-12 h-12 flex items-center justify-center">
        <HiOutlinePlus className='text-neutral-400' size={20} />
      </div>
    </div>
  );
}

