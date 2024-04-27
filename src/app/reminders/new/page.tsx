'use client';

import { FC, ReactElement } from "react";
import {useStore} from '@/app/store';
import ReminderForm from '@/components/reminder/reminder-form';
import ReminderLayout from "../layout";
import {useRouter} from 'next/navigation';
import { ReminderType } from "@/components/reminder/reminder_def";
import { CounterType } from "@/app/counter_def";


const Page: FC = () => {
  const {count, setReminder} = useStore();
  const router = useRouter();

  const defaultValues:ReminderType = {
    type: 'every',
    id: 0, // maybe we need to change the default value here
    notification: false,
    title: 'my reminder',
    note: '',
    repeat: {
      interval: 1,
      times: 1,
      start: count
    }
  };

  function handleSubmit(newReminder:CounterType):void {
    setReminder(newReminder);
    router.push("/");
  }

  return (
    <div className='mx-4 my-3'>
      <h1 className='font-semibold text-lg mb-4'>Create a new Reminder</h1>
      <section className=''>
        <ReminderForm reminder={defaultValues} handleFormSubmit={handleSubmit} />
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