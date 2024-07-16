'use server'

import Counter from '@/components/sections/counter';
import ReminderList from '@/components/reminders/reminder-list';
import {findAllSections, findSectionById, findSectionReminders, getUserSettings, setActiveSection} from '@/database/queries/queries';
import ReminderPrompt from '@/components/reminders/reminder-prompt';
import HydrateCounterStore from '../../../components/store/hydrate-counter-store';
import ZustandHydration from '../../../components/store/zustand-hydration';
import SectionHeader from '@/components/sections/section-header';
import {auth} from "@clerk/nextjs/server";
import {notFound} from 'next/navigation';
import HydrateUserSettingsStore from '@/components/store/hydrate-user-settings-store';
import {BlobCounter} from '@/components/ui/blob-counter';
import SectionProgress from '@/components/sections/section-progress';
import CounterActionBar from '@/components/sections/couter-actions';
import dynamic from 'next/dynamic';
import PreviousSectionButton from '@/components/sections/previous-section-button';
import NextSectionButton from '@/components/sections/next-section-button';

export default async function Page({params}: {params: {sectionId: number}}) {

  const {userId} = auth().protect();

  const result = await findSectionById(userId, params.sectionId)
  if (!result) notFound()

  const userSettings = await getUserSettings(userId)
  const {sections: section, projects: project} = result
  const reminders = await findSectionReminders(userId, section.id)

  await setActiveSection(userId, params.sectionId)
  const allSections = await findAllSections(userId, section.projectId)

  const Guide = dynamic(() => import('@/components/ui/guide'), {ssr: false})

  return (
    <>
      <HydrateUserSettingsStore storeSound={userSettings.sound} showGuide={userSettings.guide} />
      <HydrateCounterStore storeCount={section.count} storeTitle={section.title} />
      <Guide />
      <SectionProgress numOfRows={section.numOfRows || 0} color={project.color} />

      <div className="grid grid-cols-12 grid-rows-12 h-[calc(100vh_+_2rem)] sm:h-[calc(100dvh_-_4rem)] px-6 pt-2 pb-6 w-full">

        <SectionHeader className='col-span-6 sm:col-span-2' section={section} userSettings={userSettings} />

        <ZustandHydration>
          <div className="relative z-30 col-span-8 col-start-3 sm:col-span-4 sm:col-start-5 row-span-1 row-start-2 sm:row-start-1 place-content-start justify-center flex flex-row flex-wrap gap-2 mt-4">
            <ReminderPrompt userId={userId} reminders={reminders} />
          </div>
        </ZustandHydration>

        <CounterActionBar section={section} userSettings={userSettings} numOfSections={allSections.length} reminders={reminders} className="mt-3 relative z-40 row-start-1 row-span-6 col-end-13 justify-self-end mb-auto" />

        <div className='self-start col-span-10 row-span-8 row-start-2 col-start-2 place-content-center flex items-center justify-center relative'>
          {/* <div className='flex items-center justify-center w-full'> */}
          <PreviousSectionButton userId={userId} section={section} className='absolute -left-10 z-30' />
          <ZustandHydration fallback={<BlobCounter count={section.count} color={project.color} blobIndex={project.blobId} sound={userSettings.sound} reminders={reminders} />}>
            <Counter userId={userId} sectionId={section.id} projectColor={project.color} userSettings={userSettings} blobIndex={section.blobId} reminders={reminders} />
          </ZustandHydration>
          <NextSectionButton userId={userId} section={section} numOfSections={allSections.length} className='absolute -right-10 z-30' />
          {/* </div> */}
        </div>

        <ReminderList userId={userId} sectionId={section.id} reminders={reminders} className="col-start-1 col-span-11 row-start-auto row-span-4 flex flex-row gap-6 items-end h-full" />

      </div>

    </>
  );
}