'use client';

import {useState} from "react";
import {useStore, findReminder} from '@/app/store';
import ReminderForm from '@/components/reminder/reminder-form';
import {useRouter, useParams} from 'next/navigation';



export default function Page () {
  const {updateReminder} = useStore();
  const router = useRouter();
  const params = useParams();

  const reminder = useStore(findReminder(parseInt(params.id)));

  function handleSubmit (newReminder) {
    newReminder.id = reminder.id;
    updateReminder(newReminder);
    router.push("/");
  }

  if (!reminder) {
    return <p>Loading</p>;
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
