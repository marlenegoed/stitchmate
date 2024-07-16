'use client'
import {Section, changeActiveSection} from '@/database/queries/queries'
import {HiChevronRight} from 'react-icons/hi2'
import {Button} from '../ui/button'
import {cn} from '@/lib/utils'

interface NextSectionButtonProps {
  userId: string,
  section: Section,
  numOfSections: number,
  className?: string,
}

export default function NextSectionButton({userId, section, numOfSections, className}: NextSectionButtonProps) {

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
        className='disabled:opacity-30'
        onClick={moveToNextSection}
        disabled={section.position + 1 >= numOfSections ? true : false}
      >
        <HiChevronRight size={24} />
      </Button>
    </div>
  )
}
