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
import SectionProgress from '@/components/sections/section-progress';


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

      <SectionHeader section={section} numOfSections={allSections.length} projectTitle={project.title} userSettings={userSettings} className='max-w-6xl' />
      <SectionProgress numOfRows={section.numOfRows || 0} className="max-w-6xl" />

      <section className='max-w-6xl w-full flex-1 flex-col flex justify-center items-center mb-4 relative' >
        <div className='mb-auto'>
          <ZustandHydration fallback={<BlobCounter count={section.count} color={project.color} blobIndex={project.blobId} sound={userSettings.sound} />}>
            <Counter sectionId={section.id} projectColor={project.color} userSettings={userSettings} blobIndex={project.blobId} />
          </ZustandHydration>
        </div>
        <div className='absolute max-w-40 s:max-w-m md:max-w-md l:max-w-xl xl:max-w-3xl min-h-10 flex flex-wrap justify-center gap-4 -top-8'>
          <ReminderPrompt reminders={reminders} className='z-10' />
        </div>
      </section>

      <ReminderList sectionId={section.id} reminders={reminders} className='max-w-6xl' />
    </>
  );
}