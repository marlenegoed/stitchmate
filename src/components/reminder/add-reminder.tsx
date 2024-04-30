
import {IoAdd} from "react-icons/io5";
import Link from 'next/link';

export default function AddReminder():JSX.Element {

  return (
    <Link className='' href="/reminders/new">
      <div className='relative z-10 w-40 h-40 flex bg-viridian-200 rounded-xl py-3 px-4'>
        <h4 className='font-semibold text-slate-800'>Add a new reminder</h4>
        <IoAdd className='text-slate-800 self-end' size={64} />
      </div>
    </Link>
  );
}

