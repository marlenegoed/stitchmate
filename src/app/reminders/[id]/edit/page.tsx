'use server';

import ReminderForm from '@/components/reminders/reminder-form';
import {findReminderById, findSectionById} from '@/database/queries/projects';
import Title from '@/components/ui/title';
import DeleteReminder from '@/components/reminders/delete-reminder';

export default async function Page({params}: {params: {id: string}}) {

  const reminderId = params.id
  const reminder = await findReminderById(reminderId);

  if (!reminder) {
    return <p>Loading</p>;
  }
  const section = await findSectionById(reminder.sectionId)

  if (! section)  {
    return 
  }

  return (
    <div className='mx-4 my-3'>
      <div className='flex flex-row justify-between mb-4 items-center'>

        <Title>Edit Reminder</Title> 
        {/* {/* <DeleteReminder /> */}
      </div>
      <section>
        <ReminderForm reminder={reminder} count={section.count} sectionId={section.id} projectId={section.projectId}/>
      </section>
    </div>
  );
}