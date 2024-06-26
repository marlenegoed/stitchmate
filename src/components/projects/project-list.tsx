import ProjectCard from '@/components/projects/project-card'
import ProjectListPagination from '@/components/projects/project-list-pagination'
import {getAllProjects, countProjects} from '@/database/queries/queries'

export async function ProjectList({title, favorite, userId, page}: {title?: string, favorite?: boolean, userId: string, page: number}) {
  const projects = await getAllProjects(userId, title, favorite, page)
  const projectCount = await countProjects(userId, title, favorite)

  return (
    <>
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 min-[500px]:grid-cols-2 grid-flow-row gap-4 w-full mt-4 overflow-y-auto'>
        {projects.map(project => <ProjectCard key={project.id} project={project} sections={project.sections} />
        )}
      </div>
      <ProjectListPagination pageCount={Math.floor(projectCount / 24)} />
    </>
  )
}