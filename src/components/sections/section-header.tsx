'use client'

import CounterActions from './couter-actions'
import SectionProgress from './section-progress'
import {HiChevronLeft} from "react-icons/hi2";
import {HiChevronRight} from "react-icons/hi2";
import {Button} from '../ui/button';
import {Section, UserSettings, changeActiveSection} from '@/database/queries/projects';
import SectionTitleField from './section-title-field';
import Title from '../ui/title';
import {UserRoundIcon} from 'lucide-react';


interface SectionHeaderProps {
  section: Section,
  numOfSections: number,
  projectTitle: string,
  userId: string, 
  userSettings: UserSettings
}

export default function SectionHeader({section, numOfSections, projectTitle, userId, userSettings}: SectionHeaderProps) {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='flex flex-row w-full mb-3'>
        <div className='flex flex-row items-center w-full ml-6'>
          <Title className='text-slate-800 opacity-70 text-xl font-normal'>{projectTitle}</Title>
          <SectionTitleField id={section.id} title={section.title} userId={userId} />
        </div>
        <div className='flex flex-row items-center mr-4 gap-6'>
          <CounterActions section={section} userSettings={userSettings}/>
          <SectionPagination section={section} numOfSections={numOfSections} />
        </div>
      </div>
      <SectionProgress position={section.position} numOfSections={numOfSections} numOfRows={section.numOfRows || 0} />
    </div>
  )
}

interface SectionPaginationProps {
  section: Section,
  numOfSections: number
}

function SectionPagination({section, numOfSections}: SectionPaginationProps) {
  // TODO: Make this more flexibel and show current position 
  async function moveToPrevSection() {
    if (section.position <= 0) return
    const newPosition = section.position - 1
    await changeActiveSection(section.projectId, newPosition)
  }

  async function moveToNextSection() {
    const newPosition = section.position + 1
    if (newPosition >= numOfSections) return
    await changeActiveSection(section.projectId, newPosition)
  }

  return (

    <div className='flex flex-row text-slate-700'>
      <Button size='icon' variant='ghost' className='disabled:opacity-30' onClick={moveToPrevSection} disabled={section.position <= 0 ? true : false}><HiChevronLeft size={24} /></Button>
      {/* <span>{section.position} / {numOfSections}</span> */}
      <Button size='icon' variant='ghost' className='disabled:opacity-30' onClick={moveToNextSection} disabled={section.position + 1 >= numOfSections ? true : false}><HiChevronRight size={24} /></Button>
    </div>
  )
}