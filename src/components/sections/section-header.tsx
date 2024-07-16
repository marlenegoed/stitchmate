'use client'

import {Section, UserSettings} from '@/database/queries/queries';
import SectionTitleField from './section-title-field';
import {cn} from '@/lib/utils';
import NumOfRows from './num-of-rows';
import {useMediaQuery} from '@/lib/use-media-query';

interface SectionHeaderProps {
  section: Section,
  userSettings: UserSettings,
  className?: string,
}

export default function SectionHeader({section, userSettings, className, }: SectionHeaderProps) {

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



