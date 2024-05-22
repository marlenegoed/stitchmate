'use server'

import Counter from '@/components/sections/counter';
import ReminderList from '@/components/reminders/reminder-list';
import {findAllSections, findSectionById, findSectionReminders, getUserSettings, setActiveSection} from '@/database/queries/projects';
import ReminderPrompt from '@/components/reminders/reminder-prompt';
import HydrateCounterStore from '../../../components/store/hydrate-counter-store';
import ZustandHydration from '../../../components/store/zustand-hydration';
import SectionHeader from '@/components/sections/section-header';
import {auth} from "@clerk/nextjs/server";
import {notFound} from 'next/navigation';
import HydrateUserSettingsStore from '@/components/store/hydrate-user-settings-store';
import {BlobCounter} from '@/components/ui/blob-counter';


export default async function Page({params}: {params: {sectionId: number}}) {
  const {userId} = auth().protect();

  const result = await findSectionById(userId, params.sectionId)
  if (!result) notFound()

  const userSettings = await getUserSettings(userId)
  const {sections: section, projects: project} = result
  const reminders = await findSectionReminders(section.id)

  await setActiveSection(params.sectionId)
  const allSections = await findAllSections(section.projectId)

  return (
    <>
      <HydrateUserSettingsStore storeSound={userSettings.sound} />
      <HydrateCounterStore storeCount={section.count} storeTitle={section.title} />

      <SectionHeader section={section} numOfSections={allSections.length} projectTitle={project.title} userId={userId} userSettings={userSettings} />
      <section className='w-full flex-1 flex-col flex justify-center items-center' >
        <div className='mb-auto'>
          <div className='w-full min-h-10 -mt-8 space-y-4'>
            <ReminderPrompt reminders={reminders} />
          </div >
          <ZustandHydration fallback={<BlobCounter count={section.count} color={project.color} blobIndex={project.blobId} sound={userSettings.sound} />}>
            <Counter sectionId={section.id} projectColor={project.color} userSettings={userSettings} blobIndex={project.blobId} />
          </ZustandHydration>
        </div>
        <div className='flex flex-row w-full justify-between self-end pr-2 mb-4' />
      </section>

      <section className='flex w-full mt-auto mb-4 px-6'>
        <ReminderList sectionId={section.id} reminders={reminders} />
      </section>
    </>
  );
}