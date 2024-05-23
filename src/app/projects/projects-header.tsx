'use client'

import FilterProjectFavorites from '@/components/projects/filter-project-favorites';
import ProjectDialog from '@/components/projects/project-dialog';
import ProjectListSearch, {ProjectSearchIcon, ProjectSearchInput, useTitleSearch} from '@/components/projects/projects-list-search';
import {Button} from '@/components/ui/button';
import autoAnimate from '@formkit/auto-animate';
import {Title} from '@radix-ui/react-toast';
import clsx from 'clsx';
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
    <div className='grid grid-cols-12 w-full items-center px-6 mt-2'>
      <FilterProjectFavorites className="sm:hidden" />

      <Button
        variant='ghost'
        className='hover:bg-neutral-200 sm:hidden'
        size='icon'
        onMouseDown={() => {
          setShowSearchInput(!showSearchInput)
          setTimeout(() => projectSearchRef.current?.focus(), 0)
        }}
      >
        <ProjectSearchIcon variant="outline" size={20} />
      </Button>

      <Title className='col-span-8 sm:col-span-3 justify-self-center sm:justify-self-start font-semibold'>My Projects</Title>

      <ProjectDialog userId={userId} className='col-start-11 col-span-2 flex justify-self-end sm:hidden' />

      <div ref={showSearchParent} className="col-span-12 sm:hidden">
        {showSearchInput &&
          <ProjectSearchInput ref={projectSearchRef} defaultValue={title || ''} onChange={(e) => handleSearch(e.target.value)} />
        }
      </div>

      <div className='hidden col-span-12 sm:col-span-9 sm:grid sm:grid-cols-12'>
        <div className='sm:justify-end sm:col-span-8 flex flex-row gap-4 md:justify-center'>
          <ProjectListSearch className="w-fit" />
          <FilterProjectFavorites />
        </div>

        <ProjectDialog userId={userId} className='col-start-12 hidden sm:flex justify-self-end' />
      </div>
    </div >
  )
}