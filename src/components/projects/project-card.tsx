import Link from 'next/link'
import {HiEllipsisVertical} from "react-icons/hi2";
import {Project, Section} from '@/database/queries/queries';
import FavoriteProject from './favorite-project-button';
import BackgroundBlob from '../ui/background-blobs';
import {Button} from '../ui/button';
import shortenText from '@/lib/shorten-text';
import Image from 'next/image'
import pattern1 from '../../../public/pattern1.png'
import pattern2 from '../../../public/pattern2.png'
import pattern3 from '../../../public/pattern3.png'
import pattern4 from '../../../public/pattern4.png'
import pattern5 from '../../../public/pattern5.png'
import pattern6 from '../../../public/pattern6.png'
import pattern7 from '../../../public/pattern7.png'
import pattern8 from '../../../public/pattern7.png'
import {Label} from '../ui/label';
import Tag from '../ui/tag';

interface ProjectCardProps {
  project: Project,
  sections: Section[]
}

export default async function ProjectCard({project, sections}: ProjectCardProps) {
  const activeSection = sections.find(section => section.active) || sections[0]
  const patterns = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6, pattern7, pattern8]

  let rowsknitted = 0
  for (let section of sections) {
    rowsknitted += section.count
  }

  return (
    <div className='w-full bg-white rounded-lg relative'>

      <div className='pl-4 pr-2 pt-2 flex flex-row justify-between items-center z-20 absolute w-full'>
            <Tag className='rounded-md text-base bg-white font-semibold text-sienna-300'>{project.status}</Tag>
            <FavoriteProject userId={project.userId} projectId={project.id} isFavorite={project.favorite} />
      </div>

      <Link href={`/sections/${activeSection.id}`}>
        <div className={`flex flex-col bg-${project.color} rounded-t-lg h-56 pt-2 pl-4 pr-2 relative`}>
          <Image
            src={patterns[project.patternId - 1]}
            alt='background pattern'
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              opacity: 0.8
            }}
          />
        </div>
      </Link>

      <div className='flex flex-row justify-between items-start h-20 pt-3 pl-4 pr-1'>
        <div className='flex flex-col flex-1 overflow-hidden'> 
        <h4 className='text-xl font-medium text-gray-900 truncate ...'>{project.title}</h4>
        <p className='text-gray-900 font-medium'>{rowsknitted} {rowsknitted > 1 ? 'rows' : 'row'} knitted</p>
        </div>
        <div> 
        <Link className='flex justify-end' href={`/projects/${project.id}/edit`}>
          <Button size='icon' variant='ghost'>
            <HiEllipsisVertical className='fill-slate-700' size={36} />
          </Button>
        </Link>
        </div>
      </div>


    </div >
  )
}

