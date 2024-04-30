'use client';

import { FC, ReactElement } from "react";
import ReminderLayout from "../../layout";
import {useStore, findReminder} from '@/app/store';
import ReminderForm from '@/components/reminder/reminder-form';
import {useRouter, useParams} from 'next/navigation';
import DeleteReminder from '@/components/reminder/delete-reminder';
import { ReminderType } from '@/components/reminder/reminder_def';
import { CounterType } from '@/app/counter_def';

function Page () {
  const {updateReminder, deleteReminder} = useStore();
  const router = useRouter();
  const params = useParams();

  const reminder: ReminderType | undefined = useStore(findReminder(parseInt(params.id)))!;

  function handleSubmit (newReminder: CounterType) {
    newReminder.id = reminder.id;
    updateReminder(newReminder);
    router.push("/");
  }

  function handleDelete (): void {
    deleteReminder(parseInt(params.id as string));
    router.push("/");
  }

  if (!reminder) {
    return <p>Loading</p>;
  }

  return (
    <div className='mx-4 my-3'>
      <div className='flex flex-row justify-between mb-4 items-center'>
        <h1 className='font-semibold text-lg text-slate-800 pl-1'> Edit Reminder</h1>
        <DeleteReminder reminderId={reminder.id} handleDelete={handleDelete}></DeleteReminder>
      </div>
      <section>
        <ReminderForm reminder={reminder} handleFormSubmit={handleSubmit} />
      </section>
    </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement):ReactElement {
  return (
    <ReminderLayout>
      {page}
    </ReminderLayout>
  )
}

export default Page