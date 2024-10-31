'use server'

import {
  findAllSections, 
  findSectionById, 
  findSectionReminders, 
  getAllProjectDetails, 
  getUserSettings, 
  setActiveSection
} from '@/database/queries/queries';
import HydrateCounterStore from '../../../components/store/hydrate-counter-store';
import ZustandHydration from '../../../components/store/zustand-hydration';
import HydrateUserSettingsStore from '@/components/store/hydrate-user-settings-store';
import {auth} from "@clerk/nextjs/server";
import {notFound} from 'next/navigation';
import {BlobCounter} from '@/components/ui/blob-counter';
import Counter from '@/components/sections/counter';
import SectionProgress from '@/components/sections/section-progress';
import CounterActionBar from '@/components/sections/couter-actions';
import PreviousSectionButton from '@/components/sections/previous-section-button';
import NextSectionButton from '@/components/sections/next-section-button';
import NumOfRows from '@/components/sections/num-of-rows';
import SectionReminders from '@/components/sections/section-reminders';
import dynamic from 'next/dynamic';

const SectionTitle = dynamic(() => import('@/components/sections/section-title'),
  {
    loading: () => <div className='h-12'></div>,
    ssr: false
  })

export default async function Page({params}: {params: {sectionId: number}}) {

  const {userId} = auth().protect();

  const result = await findSectionById(userId, params.sectionId)
  if (!result) notFound()

  const userSettings = await getUserSettings(userId)
  const {sections: section, projects: project} = result
  const reminders = await findSectionReminders(userId, section.id)
  await setActiveSection(userId, params.sectionId)
  const allSections = await findAllSections(userId, section.projectId)
  const projectDetails = await getAllProjectDetails(project.id)


  return (
    <>
      <HydrateUserSettingsStore storeSound={userSettings.sound} showGuide={userSettings.guide} />
      <HydrateCounterStore storeCount={section.count} storeTitle={section.title} />
      <SectionProgress numOfRows={section.numOfRows || 0} color={project.color} />

      <div className="min-h-[calc(100vh_-_10rem)] sm:min-h-[calc(100vh_-_6rem)] px-3 pt-2 pb-6 w-full flex flex-col justify-between relative">

        <div className='flex w-full justify-between px-3 pt-2 items-center'>
          <SectionTitle userId={userSettings.userId} id={section.id} />
          <NumOfRows numOfRows={section.numOfRows ? section.numOfRows : 0} />
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-2 min-h-12 items-start">
          <ZustandHydration>
            <SectionReminders userId={userId} reminders={reminders} isTag={true} sectionId={section.id}/>
          </ZustandHydration>
        </div>

        <div className='flex items-center justify-between w-full'>
          <PreviousSectionButton userId={userId} section={section} className='' />
          <ZustandHydration fallback={<BlobCounter count={section.count} color="lightgrey" blobIndex={project.blobId} sound={userSettings.sound} reminders={reminders} />}>
            <Counter userId={userId} sectionId={section.id} projectColor={project.color} userSettings={userSettings} blobIndex={section.blobId} reminders={reminders} />
          </ZustandHydration>
          <NextSectionButton userId={userId} section={section} numOfSections={allSections.length} className='' />
        </div>

        <SectionReminders userId={userId} sectionId={section.id} reminders={reminders} className="px-3 w-full flex flex-row items-end" />

        <CounterSettings section={section} userSettings={userSettings} numOfSections={allSections.length} reminders={reminders} project={project} projectDetails={projectDetails} className=" absolute bottom-2 right-6 z-40" />

      </div>

    </>
  );
}