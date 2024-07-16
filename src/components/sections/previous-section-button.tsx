'use client'
import {Section, changeActiveSection} from '@/database/queries/queries'
import {Button} from '../ui/button'
import {cn} from '@/lib/utils'
import {HiChevronLeft} from 'react-icons/hi2'

export interface PreviousSectionButtonProps {
  userId: string,
  section: Section,
  className?: string,
}

export default function PreviousSectionButton({userId, section, className}: PreviousSectionButtonProps) {

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
        className='disabled:opacity-30'
        onClick={moveToPrevSection}
        disabled={section.position <= 0 ? true : false}
      >
        <HiChevronLeft size={24} />
      </Button>
    </div>
  )
}