'use client'

import CounterActions from './couter-actions'
import {HiChevronLeft} from "react-icons/hi2";
import {HiChevronRight} from "react-icons/hi2";
import {Button} from '../ui/button';
import {Reminder, Section, UserSettings, changeActiveSection} from '@/database/queries/projects';
import SectionTitleField from './section-title-field';
import Title from '../ui/title';
import shortenText from '@/lib/shorten-text';
import {Tooltip} from '../ui/tooltip';
import {cn} from '@/lib/utils';

interface SectionHeaderProps {
  section: Section,
  numOfSections: number,
  projectTitle: string,
  userSettings: UserSettings,
  className?: string,
  reminders: Reminder[]
}

export default function SectionHeader({section, numOfSections, projectTitle, userSettings, className, reminders}: SectionHeaderProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className='grid grid-cols-12 items-center mb-4'>
        <div className='hidden col-span-6 flex-row items-center w-full ml-6 sm:flex '>
          <Title className='text-slate-800 opacity-70 text-xl font-normal min-[820px]:flex hidden '>{shortenText(projectTitle, 18)}</Title>
          <SectionTitleField id={section.id} title={section.title} />
        </div>

        <div className='col-span-6 flex flex-row justify-end'>
          <div className='lg:flex flex-row hidden items-center gap-6 mr-6'>
            <CounterActions section={section} userSettings={userSettings} numOfSections={numOfSections} reminders={reminders} />
          </div>

          <div className='hidden mr-6 sm:flex flex-row items-center'>
            <SectionPagination section={section} numOfSections={numOfSections} />
          </div>
        </div>

        {/* mobile header */}
        <div className='col-span-12 justify-center px-4 sm:hidden mb-1'>
          <div className='grid grid-cols-12 justify-center items-center'>
            <MoveToPrevSection section={section} numOfSections={numOfSections} className='col-span-2 justify-self-start self-center' />
            <div className='col-span-8 justify-self-center self-center'>
              <SectionTitleField id={section.id} title={section.title} className='w-full text-center' />
            </div>
            <MoveToNextSection section={section} numOfSections={numOfSections} className='col-span-2 justify-self-end self-center' />
          </div>
        </div>


        {/* action bar mobile:  */}
        <div className='justify-self-center self-center lg:hidden col-span-12 my-1 mx-6 bg-white rounded-full shadow-sm py-2 px-4 max-w-fit '>
          <CounterActions section={section} userSettings={userSettings} numOfSections={numOfSections} reminders={reminders} />
        </div>
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
      <Tooltip title="Go to previous section">
        <Button
          size='icon'
          variant='ghost'
          className='disabled:opacity-30 hover:bg-neutral-200 hover:bg-opacity-80 transition-colors'
          onClick={moveToPrevSection}
          disabled={section.position <= 0 ? true : false}
        >
          <HiChevronLeft size={24} />
        </Button>
      </Tooltip>

      <Tooltip title="Go to next section">
        <Button
          size='icon'
          variant='ghost'
          className='disabled:opacity-30 hover:bg-neutral-200 hover:bg-opacity-80 transition-colors'
          onClick={moveToNextSection}
          disabled={section.position + 1 >= numOfSections ? true : false}
        >
          <HiChevronRight size={24} />
        </Button>
      </Tooltip>
    </div>
  )
}



interface MoveToSectionProps {
  section: Section,
  numOfSections: number,
  className?: string
}

function MoveToNextSection({section, numOfSections, className}: MoveToSectionProps) {


  async function moveToNextSection() {
    const newPosition = section.position + 1
    if (newPosition >= numOfSections) return
    await changeActiveSection(section.projectId, newPosition)
  }

  return (

    <div className={cn('flex flex-row text-slate-700', className)}>
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


function MoveToPrevSection({section, className}: MoveToSectionProps) {
  async function moveToPrevSection() {
    if (section.position <= 0) return
    const newPosition = section.position - 1
    await changeActiveSection(section.projectId, newPosition)
  }

  return (
    <div className={cn('flex flex-row text-slate-700', className)}>
      <Button
        size='icon'
        variant='ghost'
        className='disabled:opacity-30 hover:bg-neutral-200 hover:bg-opacity-80 transition-colors'
        onClick={moveToPrevSection}
        disabled={section.position <= 0 ? true : false}
      >
        <HiChevronLeft size={24} />
      </Button>
    </div>
  )
}



