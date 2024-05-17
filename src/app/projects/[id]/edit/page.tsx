'use server'

import ProjectForm from '@/components/projects/project-form';
import Title from '@/components/ui/title';
import BackButton from '@/components/ui/back-button';
import {findActiveSection, findProject} from '@/database/queries/projects';
import HydrateCounterStore from '../../../../components/store/hydrate-counter-store';
import PageNav from '@/components/ui/page-nav';


export default async function Page({params}: {params: {id: number}}) {

  const project = await findProject(params.id)

  const section = await findActiveSection(params.id)
  // TODO: if no project found: 404

  const defaultValues = {
    title: project?.title || '',
    description: project?.description || undefined,
    gaugeStitches: project?.gaugeStitches || undefined,
    gaugeRows: project?.gaugeRows || undefined,
    gaugeInch: project?.gaugeInch || undefined,
    needles: project?.needles?.map(size => ({size})) || [{size: ""}],
    yarn: project?.yarn?.map(yarn => ({yarn})) || [{yarn: ""}],
    color: project?.color || 'tangerine',
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
        <PageNav pageTitle='Edit Project' urlPath={`/sections/${section?.id}`} projectId={params.id} />
        {/* <Title className='flex self-center'>New Project</Title> */}
        {/* <Button></Button> */}
      </div>
      <ProjectForm defaultValues={defaultValues} projectId={params.id} />
    </>
  );
}