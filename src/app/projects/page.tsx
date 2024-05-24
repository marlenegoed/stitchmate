import {Suspense} from 'react';
import {auth} from "@clerk/nextjs/server";
import {ProjectsHeader} from './projects-header';
import ProjectCard from '@/components/projects/project-card';
import ProjectListPagination from '@/components/projects/project-list-pagination';
import {getAllProjects, countProjects} from '@/database/queries/projects';

export default async function Page({searchParams}: {searchParams?: {title?: string, favorite?: string, page?: number}}) {
  const {userId} = auth().protect();

  const title = searchParams?.title || ''
  const favorite = searchParams?.favorite === '1' ? true : false;
  const page = searchParams?.page || 0


  return (
    <>
      <ProjectsHeader userId={userId} />
      <Suspense>
        <ProjectList title={title} favorite={favorite} userId={userId} page={page} />
      </Suspense>
    </>
  )
}

export async function ProjectList({title, favorite, userId, page}: {title?: string, favorite?: boolean, userId: string, page: number}) {
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