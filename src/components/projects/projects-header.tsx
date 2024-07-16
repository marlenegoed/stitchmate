'use client'

import FilterProjectFavorites from '@/components/projects/filter-project-favorites';
import ProjectDialog from '@/components/projects/project-dialog';
import ProjectListSearch, {ProjectSearchIcon, ProjectSearchInput, useTitleSearch} from '@/components/projects/projects-list-search';
import {Button} from '@/components/ui/button';
import autoAnimate from '@formkit/auto-animate';
import {Title} from '@radix-ui/react-toast';
import {useEffect, useRef, useState} from 'react';

export function ProjectsHeader({userId}: {userId: string}) {
  const [title, handleSearch] = useTitleSearch()
  const [showSearchInput, setShowSearchInput] = useState(!!title)
  const projectSearchRef = useRef<HTMLInputElement>(null)
  const showSearchParent = useRef(null)

  useEffect(() => {
    showSearchParent.current && autoAnimate(showSearchParent.current)
  }, [showSearchParent])

  return (
    <>
      <div className='flex flex-row w-full justify-between mt-2 mb-3'>
        <Title className='text-2xl font-semibold'>My Projects</Title>
        <div>
          <ProjectDialog userId={userId} />
          <FilterProjectFavorites />
          <Button
            variant='ghost'
            size='icon'
            onMouseDown={() => {
              setShowSearchInput(!showSearchInput)
              setTimeout(() => projectSearchRef.current?.focus(), 0)
            }}
          >
            <ProjectSearchIcon variant="outline" size={20} />
          </Button>
        </div>
      </div>

      <div ref={showSearchParent} className="w-full ">
        {showSearchInput &&
          <ProjectSearchInput ref={projectSearchRef} defaultValue={title || ''} onChange={(e) => handleSearch(e.target.value)} />
        }
      </div>

    </>
  )
}