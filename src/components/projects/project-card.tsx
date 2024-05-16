'use server'

import Link from 'next/link'
import {HiEllipsisVertical} from "react-icons/hi2";
import {findActiveSection, findAllSections, findProject} from '@/database/queries/projects';
import moment from 'moment';

interface ProjectCardProps {
  title: string,
  id: number
}

export default async function ProjectCard({title, id}: ProjectCardProps) {

  const project = await findProject(id)
  const time = moment(project?.createdAt).format('MMMM Do YYYY')
  const sections = await findAllSections(id)
  const activeSection = await findActiveSection(id)

  // if (!activeSection) {
  //   return 
  // }

  let rowsknitted = 0
  for (let section of sections) {
    rowsknitted += section.count
  }

  const sectionLink = activeSection ? `/sections/${activeSection.id}` : `/sections/${sections[0].id}`

  return (
    <div className='bg-eggshell rounded-lg'>
      <div className='flex flex-row justify-between'>
        <Link href={sectionLink}>
          <div className='min-h-40'>
            <h4 className='text-xl font-semibold mt-3 pl-4'>{title}</h4>
          </div>

          <div className='m-4'>
            <p>created: {time}</p>
            <p>{rowsknitted} {rowsknitted > 1 ? 'rows' : 'row'} knitted in {sections.length} {sections.length > 1 ? 'sections' : 'section'} </p>
          </div>

        </Link>
        <Link className='flex justify-end pr-4 pt-4' href={`/projects/${id}/edit`}><HiEllipsisVertical className='text-viridian-700' size={24} /></Link>
      </div>
    </div>
  )

}

