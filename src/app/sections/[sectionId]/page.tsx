'use server'
import Counter from '@/components/sections/counter';
import ReminderList from '@/components/reminders/reminder-list';
import {findAllSections, findProject, findSectionById, setActiveSection} from '@/database/queries/projects';
import ReminderPrompt from '@/components/reminders/reminder-prompt';
import HydrateCounterStore from '../../../components/store/hydrate-counter-store';
import ZustandHydration from '../../../components/store/zustand-hydration';
import BackgroundBlob from '@/components/ui/background-blobs';
import SectionHeader from '@/components/sections/section-header';
import {auth} from "@clerk/nextjs/server";
import {notFound} from 'next/navigation';


export default async function Page({params}: {params: {sectionId: number}}) {

  const {userId} = auth().protect();
  
  const section = await findSectionById(userId, params.sectionId)
  
  if (!section ) notFound()
    
  const project = await findProject(userId, section.projectId)
  if (!project ) notFound()

  await setActiveSection(params.sectionId)
  
  const allSections = await findAllSections(section.projectId)


  return (
    <>
      <HydrateCounterStore storeCount={section.count} storeTitle={section.title} />
      <SectionHeader section={section} numOfSections={allSections.length} projectTitle={project.title} userId={userId}/>
      <section className='w-full flex-1 flex-col flex justify-center' >
        <div className='mb-auto'>
          <div className='flex justify-center w-full min-h-10 -mt-6'>
            <ReminderPrompt reminders={section.reminders} />
          </div >
          {/* TODO: Extract this from the counter component to make this nicer */}
          <ZustandHydration fallback={<div className='relative flex items-center justify-center'>
            <button className='text-8xl text-center z-10 relative text-zinc-800 p-16'>
              <span>&nbsp;</span>
            </button>
            <BackgroundBlob className={`${project.color} absolute top-0 left-0`} stroke={true} />
          </div>}>
            <Counter sectionId={section.id} projectColor={project.color} />
          </ZustandHydration>
        </div>
        <div className='flex flex-row w-full justify-between self-end pr-2 mb-4'>
        </div>
      </section >

      <section className='flex w-full mt-auto mb-4 px-6'>
        <ReminderList sectionId={section.id} reminders={section.reminders}></ReminderList>
      </section>
    </>
  );
}