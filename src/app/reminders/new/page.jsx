'use client';

import {useState, useEffect} from "react";
import {useStore} from '@/app/store';
import ReminderForm from '@/components/reminder/reminder-form';
import {useRouter} from 'next/navigation';


export default function Page () {
  const {count, setReminder} = useStore();
  const router = useRouter();

  const reminder = {
    type: 'every',
    title: 'my reminder',
    note: '',
    repeat: {
      interval: '',
      times: '',
      start: count
    }
  };

  function handleSubmit (newReminder) {
    setReminder(newReminder);
    router.push("/");
  }

  return (
    <div className='mx-4 my-3'>
      <h1 className='font-semibold text-lg mb-4'>Create a new Reminder</h1>
      <section className=''>
        <ReminderForm reminder={reminder} handleFormSubmit={handleSubmit} />
      </section>
    </div>

  );

}
