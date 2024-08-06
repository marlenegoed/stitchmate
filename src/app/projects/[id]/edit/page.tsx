'use server'

import ProjectForm from '@/components/projects/project-form';
import {findProject, findProjectNeedles} from '@/database/queries/queries';
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
  const needles = await findProjectNeedles(params.id)

  const defaultValues = {
    title: shortenText(project.title, 26),
    description: project.description || undefined,
    gaugeStitches: project.gaugeStitches || undefined,
    gaugeRows: project.gaugeRows || undefined,
    gaugeInch: project.gaugeInch || undefined,
    needles: needles.map(needle => ({size: needle.size || "", usedFor: needle.usedFor || ""})),
    yarn: project.yarn?.map(yarn => ({yarn})) || [{yarn: ""}],
    color: project.color || 'tangerine',
    createdAt: project.createdAt || new Date(),
    finishBy: project.finishBy || undefined,
    completed: project.completed || undefined,
    status: project.status || 'wip',
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