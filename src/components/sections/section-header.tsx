'use client'

import CounterActions from './couter-actions'
import {HiChevronLeft} from "react-icons/hi2";
import {HiChevronRight} from "react-icons/hi2";
import {Button} from '../ui/button';
import {Reminder, Section, UserSettings, changeActiveSection} from '@/database/queries/queries';
import SectionTitleField from './section-title-field';
import Title from '../ui/title';
import shortenText from '@/lib/shorten-text';
import {Tooltip} from '../ui/tooltip';
import {cn} from '@/lib/utils';
import NumOfRows from './num-of-rows';

interface SectionHeaderProps {
  section: Section,
  numOfSections: number,
  projectTitle: string,
  userSettings: UserSettings,
  className?: string,
  reminders: Reminder[]
}

export default function SectionHeader({section, numOfSections, projectTitle, userSettings, className, reminders}: SectionHeaderProps) {

  let numOfRows
  if (!section.numOfRows) {
    numOfRows = 0
  } else {
    numOfRows = section.numOfRows
  }

  return (
    <div className={cn('w-full flex flex-col items-start gap-2', className)}>
      {/* <Title className='text-slate-800 opacity-70 text-xl font-normal min-[820px]:flex hidden '>{shortenText(projectTitle, 18)}</Title> */}
      <SectionTitleField userId={userSettings.userId} id={section.id} title={section.title} />
      {numOfRows !== 0 &&
        <NumOfRows numOfRows={numOfRows} />
      }

      {/* <div className='col-span-6 flex flex-row justify-end'>
          <div className='lg:flex flex-row hidden items-center gap-6 mr-6'>
            <CounterActions section={section} userSettings={userSettings} numOfSections={numOfSections} reminders={reminders} />
          </div>

          <div className='hidden mr-6 sm:flex flex-row items-center'>
            <SectionPagination userId={userSettings.userId} section={section} numOfSections={numOfSections} />
          </div>
        </div> */}


      {/* action bar mobile:  */}
      {/* <div className='justify-self-center self-center lg:hidden col-span-12 my-1 mx-6 bg-white rounded-full shadow-sm py-2 px-4 max-w-fit '>
          <CounterActions section={section} userSettings={userSettings} numOfSections={numOfSections} reminders={reminders} />
        </div> */}
    </div>
  )
}

export function MobileSectionHeader({section, userSettings}: SectionHeaderProps) {

  let numOfRows
  if (!section.numOfRows) {
    numOfRows = 0
  } else {
    numOfRows = section.numOfRows
  }

  return (

    <div className='lg:hidden flex w-full justify-between items-center px-6 pt-2' >
      <SectionTitleField userId={userSettings.userId} id={section.id} title={section.title} />
      {numOfRows !== 0 &&
        <NumOfRows numOfRows={numOfRows} />}
    </div>

  )

}

interface SectionPaginationProps {
  userId: string,
  section: Section,
  numOfSections: number
}

function SectionPagination({userId, section, numOfSections}: SectionPaginationProps) {
  // TODO: Make this more flexibel and show current position 
  async function moveToPrevSection() {
    if (section.position <= 0) return
    const newPosition = section.position - 1
    await changeActiveSection(userId, section.projectId, newPosition)
  }

  async function moveToNextSection() {
    const newPosition = section.position + 1
    if (newPosition >= numOfSections) return
    await changeActiveSection(userId, section.projectId, newPosition)
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
  userId: string,
  section: Section,
  numOfSections: number,
  className?: string
}

function MoveToNextSection({userId, section, numOfSections, className}: MoveToSectionProps) {


  async function moveToNextSection() {
    const newPosition = section.position + 1
    if (newPosition >= numOfSections) return
    await changeActiveSection(userId, section.projectId, newPosition)
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


function MoveToPrevSection({userId, section, className}: MoveToSectionProps) {
  async function moveToPrevSection() {
    if (section.position <= 0) return
    const newPosition = section.position - 1
    await changeActiveSection(userId, section.projectId, newPosition)
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



