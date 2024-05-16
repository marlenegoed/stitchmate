'use client'

import Link from 'next/link';
import CounterActions, {AddSection} from './couter-actions'
import SectionProgress from './section-progress'
import {HiChevronLeft} from "react-icons/hi2";
import {HiChevronRight} from "react-icons/hi2";
import {Button} from '../ui/button';
import {Section, changeActiveSection} from '@/database/queries/projects';
import SectionTitleField from './section-title-field';
import SectionDialog from './section-dialog';
import Title from '../ui/title';

interface SectionHeaderProps {
  section: Section,
  numOfSections: number,
  projectTitle: string, 
}

export default function SectionHeader({section, numOfSections, projectTitle}: SectionHeaderProps) {

  console.log(section)

  async function moveToPrevSection() {
    if (section.position <= 1) return
    const newPosition = section.position - 1
    await changeActiveSection(section.projectId, newPosition)
  }

  async function moveToNextSection() {
    console.log(section.projectId)
    const newPosition = section.position + 1
    if (newPosition > numOfSections) return
    await changeActiveSection(section.projectId, newPosition)
  }

  return (
    <div className='w-full flex flex-col items-center pt-2'>
      <div className='flex flex-row w-full mb-3'>
        <div className='flex flex-row items-center w-full ml-6'>
          <Title className='text-neutral-300 text-2xl'>{projectTitle} / </Title>
          <SectionTitleField id={section.id} title={section.title} />
        </div>
        <div className='flex flex-row items-center mr-4 gap-6'>
          <CounterActions section={section} />
          <div className='flex flex-row'>
            {/* <Link href=''> */}
              <Button size='icon' variant='ghost' onClick={moveToPrevSection} disabled={section.position <= 1 ? true : false}><HiChevronLeft size={24} /></Button>
              {/* </Link> */}
            {/* <Link href=''> */}
              <Button size='icon' variant='ghost' onClick={moveToNextSection} disabled={section.position + 1 > numOfSections ? true : false}><HiChevronRight size={24} /></Button>
              {/* </Link> */}
          </div>
        </div>
      </div>



      <SectionProgress position={section.position} numOfSections={numOfSections} numOfRows={section.numOfRows || 0} />
    </div>
  )
}