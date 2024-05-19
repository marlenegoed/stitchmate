import Link from 'next/link'
import {HiEllipsisVertical} from "react-icons/hi2";
import {Project, Section} from '@/database/queries/projects';
import FavoriteProject from './favorite-project-button';
import BackgroundBlob from '../ui/background-blobs';


interface ProjectCardProps {
  project: Project,
  sections: Section[]
}

export default async function ProjectCard({project, sections}: ProjectCardProps) {
  const activeSection = sections.find(section => section.active) || sections[0]

  let rowsknitted = 0
  for (let section of sections) {
    rowsknitted += section.count
  }

  return (
    <div className='relative'>
      <div className={`absolute h-full w-full top-0 bg-white rounded-lg shadow-sm`}>
        <BackgroundBlob className={`fill-${project.color} top-0 left-0 pl-24 pt-20 pb-4 absolute`} stroke={false} blobIndex={project.blobId} />
      </div>
      <div className='flex flex-row justify-between relative'>
        <Link href={`/sections/${activeSection.id}`}>
          <div className='min-h-40'>
            <h4 className='text-xl font-semibold mt-4 pl-4'>{project.title}</h4>
          </div>

          <div className='m-4'>
            <p>{rowsknitted} {rowsknitted > 1 ? 'rows' : 'row'} knitted</p>
          </div>

        </Link>
        <div className="flex flex-row h-fit items-center pr-4 pt-3 gap-2">
          <FavoriteProject projectId={project.id} isFavorite={project.favorite} />
          <Link className='flex justify-end' href={`/projects/${project.id}/edit`}>
            <HiEllipsisVertical className='text-viridian-700' size={24} />
          </Link>
        </div>
      </div>
    </div>
  )
}

