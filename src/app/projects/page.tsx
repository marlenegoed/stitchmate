'use client'

import Title from '@/components/ui/title';
import ProjectCard from '@/components/project/project-card';
import {useStore} from '../store';

export default function Page() {

  const {projects} = useStore()
  const projectsArr = Object.values(projects)

  return (
    <>
      <Title className='mb-4'>My Projects</Title>
      <div className='grid grid-cols-3 grid-flow-row gap-4 w-full mt-4'>
        {projectsArr.map(project => <ProjectCard key={project.id} title={project.title} count={project.count} numOfRows={project.numOfRows} id={project.id} />
        )}
      </div>

    </>

  )
}