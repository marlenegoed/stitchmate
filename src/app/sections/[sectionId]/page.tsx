'use server'

import Counter from '@/components/sections/counter';
import ReminderList from '@/components/reminders/reminder-list';
import {findAllSections, findSectionById, findSectionReminders, getUserSettings, setActiveSection} from '@/database/queries/queries';
import ReminderPrompt from '@/components/reminders/reminder-prompt';
import HydrateCounterStore from '../../../components/store/hydrate-counter-store';
import ZustandHydration from '../../../components/store/zustand-hydration';
import SectionHeader, {MobileSectionHeader} from '@/components/sections/section-header';
import {auth} from "@clerk/nextjs/server";
import {notFound} from 'next/navigation';
import HydrateUserSettingsStore from '@/components/store/hydrate-user-settings-store';
import {BlobCounter} from '@/components/ui/blob-counter';
import SectionProgress from '@/components/sections/section-progress';
import Guide from '@/components/ui/guide';
import CounterActionBar from '@/components/sections/couter-actions';


export default async function Page({params}: {params: {sectionId: number}}) {
  const {userId} = auth().protect();

  const result = await findSectionById(userId, params.sectionId)
  if (!result) notFound()

  const userSettings = await getUserSettings(userId)
  const {sections: section, projects: project} = result
  const reminders = await findSectionReminders(userId, section.id)

  await setActiveSection(userId, params.sectionId)
  const allSections = await findAllSections(userId, section.projectId)

  return (
    <>
      <HydrateUserSettingsStore storeSound={userSettings.sound} showGuide={userSettings.guide} />
      <HydrateCounterStore storeCount={section.count} storeTitle={section.title} />
      <Guide />
      <SectionProgress numOfRows={section.numOfRows || 0} color={project.color} />
      <MobileSectionHeader section={section} numOfSections={allSections.length} projectTitle={project.title} userSettings={userSettings} className='lg:hidden flex w-full justify-between items-center px-6 pt-2' reminders={reminders} />

      <div className="grid grid-cols-12 grid-rows-12 h-[calc(100dvh_-_2rem)] min-[380px]:h-[calc(100dvh_-_9rem)] lg:h-[calc(100dvh_-_4rem)] px-6 pt-2 pb-6 w-full">

        <SectionHeader section={section} numOfSections={allSections.length} projectTitle={project.title} userSettings={userSettings} className='lg:grid hidden lg:col-span-4 lg:col-start-1 lg:justify-start' reminders={reminders} />

        <ZustandHydration>
          <div className="relative z-30 col-span-10 col-start-2 lg:col-span-4 lg:col-start-5 row-span-2 row-start-1 place-content-start	justify-center flex flex-row flex-wrap gap-2 mt-4">
            <ReminderPrompt userId={userId} reminders={reminders} />
          </div>
        </ZustandHydration>

        <CounterActionBar section={section} userSettings={userSettings} numOfSections={allSections.length} reminders={reminders} className="mt-4 relative z-40 row-start-1 row-span-6 col-end-13 justify-self-end mb-auto" />

        <div className='col-span-10 row-span-8 sm:row-span-8 row-start-2 col-start-2'>
          <ZustandHydration fallback={<BlobCounter count={section.count} color={project.color} blobIndex={project.blobId} sound={userSettings.sound} reminders={reminders} />}>
            <Counter userId={userId} sectionId={section.id} projectColor={project.color} userSettings={userSettings} blobIndex={section.blobId} reminders={reminders} />
          </ZustandHydration>
        </div>
        <ReminderList userId={userId} sectionId={section.id} reminders={reminders} className="col-start-1 col-span-12 row-start-auto row-span-4 flex flex-row gap-6 items-end h-full" />

      </div>

    </>
  );
}