import {Section, changeActiveSection} from '@/database/queries/queries'
import {Tooltip} from '../ui/tooltip'
import {Button} from '../ui/button'
import {HiChevronLeft, HiChevronRight} from 'react-icons/hi2'
import {cn} from '@/lib/utils'

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

