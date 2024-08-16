'use server'

import Counter from '@/components/sections/counter';
import ReminderList from '@/components/reminders/reminder-list';
import {findAllSections, findSectionById, findSectionReminders, getUserSettings, setActiveSection} from '@/database/queries/queries';
import ReminderPrompt from '@/components/reminders/reminder-prompt';
import HydrateCounterStore from '../../../components/store/hydrate-counter-store';
import ZustandHydration from '../../../components/store/zustand-hydration';
import {auth} from "@clerk/nextjs/server";
import {notFound} from 'next/navigation';
import HydrateUserSettingsStore from '@/components/store/hydrate-user-settings-store';
import {BlobCounter} from '@/components/ui/blob-counter';
import SectionProgress from '@/components/sections/section-progress';
import CounterActionBar from '@/components/sections/couter-actions';
import PreviousSectionButton from '@/components/sections/previous-section-button';
import NextSectionButton from '@/components/sections/next-section-button';
import SectionTitleField from '@/components/sections/section-title-field';
import NumOfRows from '@/components/sections/num-of-rows';

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
      <SectionProgress numOfRows={section.numOfRows || 0} color={project.color} />

      <div className="min-h-[calc(100vh_-_10rem)] sm:min-h-[calc(100vh_-_6rem)] px-3 pt-2 pb-6 w-full flex flex-col justify-between relative">

        <div className='flex w-full justify-between px-3 pt-2 items-center'>
          <SectionTitleField userId={userSettings.userId} id={section.id} title={section.title} />
          <NumOfRows numOfRows={section.numOfRows ? section.numOfRows : 0} />
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-2">
          <ZustandHydration>
            <ReminderPrompt userId={userId} reminders={reminders} />
          </ZustandHydration>
        </div>

        <div className='flex items-center justify-between w-full'>
          <PreviousSectionButton userId={userId} section={section} className='' />
          <ZustandHydration fallback={<BlobCounter count={section.count} color={project.color} blobIndex={project.blobId} sound={userSettings.sound} reminders={reminders} />}>
            <Counter userId={userId} sectionId={section.id} projectColor={project.color} userSettings={userSettings} blobIndex={section.blobId} reminders={reminders} />
          </ZustandHydration>
          <NextSectionButton userId={userId} section={section} numOfSections={allSections.length} className='' />
        </div>

        <ReminderList userId={userId} sectionId={section.id} reminders={reminders} className="px-3 w-full flex flex-row items-end" />

        <CounterActionBar section={section} userSettings={userSettings} numOfSections={allSections.length} reminders={reminders} project={project} className="bottom-2 right-6 absolute z-40" />

      </div>

    </>
  );
}