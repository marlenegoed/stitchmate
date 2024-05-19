'use server'
import Title from '@/components/ui/title';
import ProjectCard from '@/components/projects/project-card';
import {getAllProjects} from '@/database/queries/projects';
import ProjectDialog from '@/components/projects/project-dialog';
import {Suspense} from 'react';
import FilterProjectFavorites from '@/components/projects/filter-project-favorites';
import ProjectListSearch from '@/components/projects/search-projects';
import {auth} from "@clerk/nextjs/server";


export default async function Page({searchParams}: {searchParams?: {title?: string, favorite?: string}}) {
  const {userId} = auth().protect();
  const title = searchParams?.title || ''
  const favorite = searchParams?.favorite === '1' ? true : false;

  return (
    <>

      <div className='flex flex-row justify-between w-full items-center px-6'>
        <Title className='my-4'>My Projects</Title>
        <div className='flex flex-row gap-4'>
          <FilterProjectFavorites />
          {/* <SortProjectDate direction={searchParams["order"]} /> */}
          <ProjectListSearch />
        </div>
        <ProjectDialog />
      </div>

      <Suspense key={title + favorite}>
        <ProjectList title={title} favorite={favorite} userId={userId} />
      </Suspense>
    </>
  )
}

async function ProjectList({title, favorite, userId}: {title?: string, favorite?: boolean, userId: string}) {
  
  const projects = await getAllProjects(userId, title, favorite)

  return (
    <div className='grid grid-cols-3 grid-flow-row gap-4 w-full mt-4 px-4'>
      {projects.map(project => <ProjectCard key={project.id} project={project} sections={project.sections} />
      )}
    </div>
  )
}