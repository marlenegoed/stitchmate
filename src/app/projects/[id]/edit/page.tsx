'use server'

import ProjectForm from '@/components/projects/project-form';
import {findProject} from '@/database/queries/queries';
import PageNav from '@/components/ui/page-nav';
import {auth} from "@clerk/nextjs/server";
import {notFound} from 'next/navigation';
import shortenText from '@/lib/shorten-text';

export default async function Page({params}: {params: {id: number}}) {
  const {userId} = auth().protect();
  const result = await findProject(userId, params.id)

  if (!result) {
    notFound()
  }
  const project = result.projects;
  const section = result.sections;

  const defaultValues = {
    title: shortenText(project.title, 26),
    description: project.description || undefined,
    gaugeStitches: project.gaugeStitches || undefined,
    gaugeRows: project.gaugeRows || undefined,
    gaugeInch: project.gaugeInch || undefined,
    needles: project.needles?.map(size => ({size})) || [{size: ""}],
    yarn: project.yarn?.map(yarn => ({yarn})) || [{yarn: ""}],
    color: project.color || 'tangerine',
  }

  if (defaultValues.needles.length === 0) {
    defaultValues.needles.push({size: ""})
  }

  if (defaultValues.yarn.length === 0) {
    defaultValues.yarn.push({yarn: ""})
  }

  return (
    <>
      <div className='flex w-full items-center'>
        <PageNav pageTitle='Edit Project' urlPath={`/sections/${section!.id}`} projectId={params.id} />
      </div>
      <ProjectForm defaultValues={defaultValues} projectId={params.id} blobId={project.blobId} userId={userId} />
    </>
  );
}