'use client';

import {useStore, findReminder} from '@/app/store';
import ReminderForm from '@/components/reminder/reminder-form';
import {useRouter, useParams} from 'next/navigation';
import DeleteReminder from '@/components/reminder/delete-reminder';
import {type Reminder} from '@/lib/reminder';

export default function Page() {
  const {updateReminder, deleteReminder} = useStore();
  const router = useRouter();

  const params = useParams<{id: string, reminderId: string}>();
  const projectId = params.id
  const reminderId = params.reminderId

  const reminder = useStore(findReminder(projectId, reminderId));

  function handleSubmit(newReminder: Reminder) {
    newReminder.id = reminder!.id;
    updateReminder(projectId, newReminder);
    router.push("/");
  }

  function handleDelete() {
    deleteReminder(projectId, reminderId);
    router.push("/");
  }

  if (!reminder) {
    return <p>Loading</p>;
  }

  return (
    <div className='mx-4 my-3'>
      <div className='flex flex-row justify-between mb-4 items-center'>
        <h1 className='font-semibold text-lg text-slate-800 pl-1'> Edit Reminder</h1>
        <DeleteReminder handleDelete={handleDelete}></DeleteReminder>
      </div>
      <section>
        <ReminderForm handleFormSubmit={handleSubmit} reminder={reminder} />
      </section>
    </div>
  );
}