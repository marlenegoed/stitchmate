import Link from 'next/link'
import {HiEllipsisVertical} from "react-icons/hi2";
import {Project, Section} from '@/database/queries/projects';
import FavoriteProject from './favorite-project-button';
import BackgroundBlob from '../ui/background-blobs';
import {Button} from '../ui/button';
import shortenText from '@/lib/shorten-text';


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
        <BackgroundBlob className={`fill-${project.color} top-0 left-0 h-1/2 absolute m-6 pb-6`} stroke={false} blobIndex={project.blobId} />
      </div>

      <div className='grid grid-cols-5 relative'>
        <div className='col-span-4 '>
          <Link href={`/sections/${activeSection.id}`}>
            <div className='min-h-40 flex items-end mt-1'>
              <h4 className='text-xl font-semibold ml-6'>{shortenText(project.title, 34)}</h4>
            </div>
            <div className='m-6 mt-1'>
              <p className='text-neutral-400'>{rowsknitted} {rowsknitted > 1 ? 'rows' : 'row'} knitted</p>
            </div>
          </Link>
        </div>
        <div className="col-span-1 pr-4 pt-3 pb-5 flex flex-col justify-between items-end">
          <FavoriteProject projectId={project.id} isFavorite={project.favorite} />

          <Link className='flex justify-end' href={`/projects/${project.id}/edit`}>
            <Button size='icon' variant='ghost'>
              <HiEllipsisVertical className='fill-slate-700' size={24} />
            </Button>
          </Link>
        </div>
      </div>
    </div >
  )
}

