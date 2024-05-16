'use server'

import ReminderForm from '@/components/reminders/reminder-form'
import Title from '@/components/ui/title'
import {findSectionById} from '@/database/queries/projects'


export default async function Page({params}: {params: {sectionId: string}}) {

  const section = await findSectionById(parseInt(params.sectionId))

  if (!section) return

  return (
    <>
      <Title>Configure Reminder</Title>
      <ReminderForm sectionId={parseInt(params.sectionId)} count={section?.count} projectId={section.projectId} />
    </>
  )

}