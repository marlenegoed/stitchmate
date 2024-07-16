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
import {useMediaQuery} from '@/lib/use-media-query';

interface SectionHeaderProps {
  section: Section,
  userSettings: UserSettings,
  className?: string,
}

export default function SectionHeader({section, userSettings, className,}: SectionHeaderProps) {

  const isMobile = useMediaQuery("(min-width: 640px)")

  let showNumOfRows
  if (section.numOfRows && isMobile) {
    showNumOfRows = true
  }

  return (
    <div className={cn('w-full flex flex-col items-start gap-2', className)}>
      <SectionTitleField userId={userSettings.userId} id={section.id} title={section.title} />
      {showNumOfRows &&
        <NumOfRows numOfRows={section.numOfRows ? section.numOfRows : 0} />
      }
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



