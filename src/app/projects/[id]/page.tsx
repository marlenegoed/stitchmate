'use client';
import {useParams} from 'next/navigation';
import Counter from '@/components/project/counter';
import Title from '@/components/ui/title';
import Rows from '@/components/project/rows';
import CountDownButton from '@/components/project/count-down-button';
import ReminderList from '@/components/reminder/reminder-list';
import {selectNotifiableNextReminders, useStore, findProject} from '../../store';
import ReminderAlertDialog from '@/components/reminder/reminder-alert-dialog';


export default function Page() {

  const {id: projectId} = useParams<{id: string}>();

  const {title, reminders, numOfRows} = useStore(findProject(projectId))

  return (
    <>
      <Title className='mt-2 mb-3' >{title}</Title >
      < section className='w-full flex-1 flex-col flex justify-center' >
        <div className='mb-auto'>
          <div className='flex justify-center w-full min-h-10'>
            <ReminderNotification projectId={projectId} />
          </div >
          <Counter />
        </div>
        <div className='flex flex-row w-full justify-between self-end pr-2 mb-4'>
          <Rows numOfRows={numOfRows} />
          <CountDownButton id={projectId} />
        </div>
      </section >

      <section className='flex justify-center w-full mt-auto mb-4'>
        <ReminderList projectId={projectId} reminders={reminders}></ReminderList>
      </section>
    </>
  );
}

function ReminderNotification({projectId}: {projectId: string}) {

  const nextReminders = useStore(selectNotifiableNextReminders(projectId));

  return (
    <div className="flex gap-4 position relative z-20 ">
      {nextReminders.map(reminder => <ReminderAlertDialog key={reminder.id} reminder={reminder} isTag={true} projectId={projectId} />)}
    </div>
  );
}