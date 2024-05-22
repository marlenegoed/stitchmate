'use client'

import CounterActions from './couter-actions'
import SectionProgress from './section-progress'
import {HiChevronLeft} from "react-icons/hi2";
import {HiChevronRight} from "react-icons/hi2";
import {Button} from '../ui/button';
import {Section, UserSettings, changeActiveSection} from '@/database/queries/projects';
import SectionTitleField from './section-title-field';
import Title from '../ui/title';
import shortenText from '@/lib/shorten-text';

interface SectionHeaderProps {
  section: Section,
  numOfSections: number,
  projectTitle: string,
  userId: string,
  userSettings: UserSettings
}

export default function SectionHeader({section, numOfSections, projectTitle, userId, userSettings}: SectionHeaderProps) {
  return (
    <div className='w-full'>
      <div className='grid grid-cols-12'>
        <div className='col-span-6 flex flex-row items-center w-full ml-6'>
          <Title className='text-slate-800 opacity-70 text-xl font-normal min-[820px]:flex hidden '>{shortenText(projectTitle, 18)}</Title>
          <SectionTitleField id={section.id} title={section.title} userId={userId} />
        </div>

        <div className='col-span-6 flex flex-row justify-end'>

          <div className='hidden md:flex flex-row items-center gap-6 mr-6'>
            <CounterActions section={section} userSettings={userSettings} />
          </div>

          <div className='mr-6 flex flex-row items-center'>
            <SectionPagination section={section} numOfSections={numOfSections} />
          </div>

        </div>

        {/* action bar mobile:  */}
        <div className='md:hidden col-span-12 mt-2 mb-5 mx-6 bg-white rounded-full shadow-sm py-2 px-4 max-w-fit justify-self-center'>
          <CounterActions section={section} userSettings={userSettings} />
        </div>

      </div>

      <div>
        <SectionProgress position={section.position} numOfSections={numOfSections} numOfRows={section.numOfRows || 0} />
      </div>
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
      <Button
        size='icon'
        variant='ghost'
        className='disabled:opacity-30 hover:bg-neutral-200 hover:bg-opacity-80 transition-colors'
        onClick={moveToPrevSection}
        disabled={section.position <= 0 ? true : false}
      >
        <HiChevronLeft size={24} />
      </Button>
      <Button
        size='icon'
        variant='ghost'
        className='disabled:opacity-30 hover:bg-neutral-200 hover:bg-opacity-80 transition-colors'
        onClick={moveToNextSection}
        disabled={section.position + 1 >= numOfSections ? true : false}
      >
        <HiChevronRight size={24} />
      </Button>
    </div>
  )
}