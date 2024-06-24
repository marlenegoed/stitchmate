import Link from 'next/link'
import {HiEllipsisVertical} from "react-icons/hi2";
import {Project, Section} from '@/database/queries/queries';
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
    <div className='w-full bg-white rounded-lg'>

      {/* <div className={`absolute top-0 left-0 h-20 bg-neutral-200 rounded-t-lg`}>
        <BackgroundBlob className={`fill-${project.color} top-0 left-0 h-10 absolute m-6 pb-6`} stroke={false} blobIndex={project.blobId} />
      </div> */}

      <Link href={`/sections/${activeSection.id}`}>

        <div className='flex flex-col bg-neutral-200 rounded-t-lg h-56 pt-2 pl-4 pr-2 relative'>

          <div className={`top-0 right-0 bg-neutral-200 rounded-t-lg h-full absolute p-10`}>
            <BackgroundBlob className={`fill-${project.color} h-full`} stroke={true} blobIndex={project.blobId} />
          </div>

          <div className='flex flex-row justify-between items-center relativ z-20'>
            <p className='text-gray-900 font-semibold'>{rowsknitted} {rowsknitted > 1 ? 'rows' : 'row'} knitted</p>
            <FavoriteProject userId={project.userId} projectId={project.id} isFavorite={project.favorite} />
          </div>
        </div>

        <div className='flex flex-row justify-between items-start h-20 pt-3 pl-4 pr-2'>
          <h4 className='text-xl font-semibold'>{shortenText(project.title, 34)}</h4>
          <Link className='flex justify-end' href={`/projects/${project.id}/edit`}>
            <Button size='icon' variant='ghost'>
              <HiEllipsisVertical className='fill-slate-700' size={24} />
            </Button>
          </Link>
        </div>

      </Link>

    </div >
  )
}

