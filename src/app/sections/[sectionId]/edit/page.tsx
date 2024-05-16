'use server'
import SectionForm from '@/components/sections/section-form'
import Title from '@/components/ui/title'
import {findSectionById} from '@/database/queries/projects'

export default async function Page({params}: {params: {sectionId: string}}) {

  const section = await findSectionById(parseInt(params.sectionId))

  if (!section) return

  return (
    <>
      <Title>Edit section</Title>
      <SectionForm section={section} />
    </>
  )

}