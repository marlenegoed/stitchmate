'use server'
import Title from '@/components/ui/title';
import ProjectCard from '@/components/projects/project-card';
import {getAllProjects} from '@/database/queries/projects';
import {MdViewCompact} from "react-icons/md";
import {FiPlus} from "react-icons/fi";
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import ProjectList from '@/components/projects/project-list';

export default async function Page() {

  const projects = await getAllProjects()

  return (
    <>
     
      <ProjectList />
      <div className='grid grid-cols-3 grid-flow-row gap-4 w-full mt-4 px-4'>
        {projects.map(project => <ProjectCard key={project.id} title={project.title} id={project.id} />
        )}
      </div>

    </>

  )
}