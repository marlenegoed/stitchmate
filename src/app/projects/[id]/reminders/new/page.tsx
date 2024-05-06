'use client';

import {useStore} from '@/app/store';
import ReminderForm from '@/components/reminder/reminder-form';
import {useRouter} from 'next/navigation';
import {type Reminder} from '@/lib/reminder';


export default function Page() {
  const {setReminder} = useStore();
  const router = useRouter();

  function handleSubmit(newReminder: Reminder) {
    setReminder(newReminder);
    router.push("/");
  }


  return (
    <div className='mx-4 my-3'>
      <h1 className='font-semibold text-lg mb-4'>Create a new Reminder</h1>
      <section className=''>
        <ReminderForm handleFormSubmit={handleSubmit} />
      </section>
    </div>

  );

}
