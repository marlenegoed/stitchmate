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
    <div className='grid grid-cols-12 w-full items-center px-4 mt-2'>

      <div className="col-span-4 flex sm:hidden">
        <Button
          variant='ghost'
          className='hover:bg-neutral-200'
          size='icon'
          onMouseDown={() => {
            setShowSearchInput(!showSearchInput)
            setTimeout(() => projectSearchRef.current?.focus(), 0)
          }}
        >
          <ProjectSearchIcon variant="outline" size={20} />
        </Button>
        <FilterProjectFavorites />
      </div>

      <Title className='text-xl col-span-4 sm:col-span-3 justify-self-center sm:justify-self-start font-semibold sm:pl-2'>My Projects</Title>

      <ProjectDialog userId={userId} className='col-span-4 flex justify-self-end sm:hidden' />

      <div ref={showSearchParent} className="col-span-12 w-full sm:hidden">
        {showSearchInput &&
          <ProjectSearchInput ref={projectSearchRef} defaultValue={title || ''} onChange={(e) => handleSearch(e.target.value)} />
        }
      </div>

      <div className='hidden sm:grid sm:col-span-9'>

        <div className='sm:grid grid-cols-12'>

          <div className='sm:justify-end sm:col-span-8 flex flex-row gap-4 md:justify-center'>
            <ProjectListSearch className="w-fit" />
            <FilterProjectFavorites />
          </div>


          <ProjectDialog userId={userId} className='sm:col-start-12 hidden sm:flex justify-self-end' />
        </div>
      </div>
    </div >
  )
}