'use server'
import Title from '@/components/ui/title';
import ProjectCard from '@/components/projects/project-card';
import {countProjects, getAllProjects} from '@/database/queries/projects';
import ProjectDialog from '@/components/projects/project-dialog';
import {Suspense} from 'react';
import FilterProjectFavorites from '@/components/projects/filter-project-favorites';
import ProjectListSearch from '@/components/projects/projects-list-search';
import {auth} from "@clerk/nextjs/server";
import ProjectListPagination from '@/components/projects/project-list-pagination';



export default async function Page({searchParams}: {searchParams?: {title?: string, favorite?: string, page?: number}}) {
  const {userId} = auth().protect();
  const title = searchParams?.title || ''
  const favorite = searchParams?.favorite === '1' ? true : false;
  const page = searchParams?.page || 0

  return (
    <>
      <div className='grid grid-cols-12 w-full items-center px-6'>
        <Title className='my-4 col-span-12 sm:col-span-3'>My Projects</Title>
        <div className='col-span-12 sm:col-span-9 grid grid-cols-12'>
          <div className='mr-2 sm:mr-0 col-span-11 justify-between sm:justify-end sm:col-span-8 flex flex-row gap-4 md:justify-center'>
            <ProjectListSearch />
            <FilterProjectFavorites />
          </div>
          <div className='col-start-12 flex justify-self-end'>
            <ProjectDialog userId={userId} />
          </div>
        </div>

      </div>
      <Suspense key={title + favorite}>
        <ProjectList title={title} favorite={favorite} userId={userId} page={page} />
      </Suspense>
    </>
  )
}


async function ProjectList({title, favorite, userId, page}: {title?: string, favorite?: boolean, userId: string, page: number}) {

  const projects = await getAllProjects(userId, title, favorite, page)
  const projectCount = await countProjects(userId, title, favorite)

  return (
    <>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 min-[500px]:grid-cols-2 grid-flow-row gap-4 w-full mt-4 px-6 overflow-y-auto'>
        {projects.map(project => <ProjectCard key={project.id} project={project} sections={project.sections} />
        )}
      </div>
      <ProjectListPagination pageCount={Math.floor(projectCount / 24)} />
    </>
  )
}