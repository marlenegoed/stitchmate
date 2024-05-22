'use client'

import {HiOutlineMagnifyingGlass} from 'react-icons/hi2';
import {Input} from '../ui/input';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce'


export default function ProjectListSearch() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = useDebouncedCallback((title) => {
    const params = new URLSearchParams(searchParams)
    if (title) {
      params.set("title", title)
    } else {
      params.delete("title")
    }
    params.delete("page")
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className='sm:ml-12'>
      <HiOutlineMagnifyingGlass className='text-slate-800 absolute mt-3 ml-4' />
      <Input
        placeholder='search Titles'
        name="title"
        variant='inline'
        className='placeholder:text-slate-800 pl-10 text-base rounded-full bg-neutral-200 h-10'
        defaultValue={searchParams.get("title")?.toString()}
        onChange={(e) => handleSearch(e.target.value)} />
    </div>
  )

}