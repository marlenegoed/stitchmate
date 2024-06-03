'use server'
import SectionForm from '@/components/sections/section-form'
import Title from '@/components/ui/title'
import {findSectionById} from '@/database/queries/queries'
import {auth} from "@clerk/nextjs/server";
import {notFound} from 'next/navigation';


export default async function Page({params}: {params: {sectionId: string}}) {

  const {userId} = auth().protect();

  const result = await findSectionById(userId, parseInt(params.sectionId))

  if (!result) notFound()

  return (
    <>
      <Title>Edit section</Title>
      <SectionForm userId={userId} section={result.sections} />
    </>
  )

}