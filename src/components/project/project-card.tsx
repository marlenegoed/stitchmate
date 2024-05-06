import Link from 'next/link'
import ProjectProgress from './project-progress'
import {Button} from '../ui/button'
import {SlOptions} from "react-icons/sl";


interface ProjectCardProps {
  title: string,
  count: number,
  numOfRows: number,
  id: string
}

export default function ProjectCard({title, count, numOfRows, id}: ProjectCardProps) {
  return (
    <div className='flex flex-col'>
      <Link href={`/projects/${id}`}>
        <div className='bg-eggshell min-h-40 rounded-lg '>
          <h4 className='text-lg p-4'>{title}</h4>
        </div>
      </Link>
      <div className='flex flex-row gap-3 px-1'>
        <ProjectProgress count={count} numOfRows={numOfRows} className='mt-4' />
        <Button className='-mr-2 -mt-0.5' variant="ghost" size="icon"><SlOptions /></Button>
      </div>
    </div>
  )

}