'use server'

import ProjectForm from '@/components/projects/project-form';
import {findProject, findProjectGauges, findProjectNeedles, findProjectYarns} from '@/database/queries/queries';
import PageNav from '@/components/ui/page-nav';
import {auth} from "@clerk/nextjs/server";
import {notFound} from 'next/navigation';
import shortenText from '@/lib/shorten-text';

export default async function Page({params}: {params: {id: number}}) {
  const {userId} = auth().protect();
  const result = await findProject(userId, params.id)
  if (!result) notFound()

  const project = result.projects;
  const section = result.sections;
  const needles = await findProjectNeedles(params.id)
  const yarn = await findProjectYarns(params.id)
  const material = yarn.map(item => {item: item.material})
  const gauge = await findProjectGauges(params.id)


  const defaultValues = {
    title: shortenText(project.title, 26),
    description: project.description || 'undefined',
    gauge: gauge.map(gauge => ({
      stitches: gauge.stitches || undefined,
      rows: gauge.rows || undefined,
      inch: gauge.inch || "",
      needle: gauge.needle || "",
      stitchPattern: gauge.stitchPattern || "",
      blocked: gauge.blocked || false,
      inRounds: gauge.inrounds || false,
    })),
    needles: needles.map(needle => ({size: needle.size || "", usedFor: needle.usedFor || ""})),
    yarn: yarn.map(yarn => ({
      name: yarn.name || "",
      color: yarn.color || "",
      lot: yarn.lot || undefined,
      yardage: yarn.yardage || undefined,
      grams: yarn.grams || undefined,
      skeins: yarn.skeins || undefined,
      material: yarn.material || undefined,
    })),
    color: project.color || 'tangerine',
    patternId: project.patternId.toString() || '1',
    createdAt: project.createdAt || new Date(),
    finishBy: project.finishBy || undefined,
    startDate: project.startDate ?? new Date(),
    completed: project.completed || new Date(),
    status: project.status || 'wip',
    pattern: project.pattern || '',
    patternUrl: project.patternUrl || '',
    size: project.size || '',
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