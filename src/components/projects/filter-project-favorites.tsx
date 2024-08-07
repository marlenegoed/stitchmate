'use client'

import {HiMiniHeart} from 'react-icons/hi2'
import {HiOutlineHeart} from 'react-icons/hi2'
import {Button} from '../ui/button'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {cn} from '@/lib/utils'

export default function FilterProjectFavorites({className}: {className?: string}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const checked = searchParams.get("favorite") === '1'
  const heart = checked ? <HiMiniHeart className='fill-slate-700' size={20} /> : <HiOutlineHeart size={20} className='text-slate-700' />
  function handleFilter() {
    const params = new URLSearchParams(searchParams)
    if (!checked) {
      params.set("favorite", "1")
    } else {
      params.delete("favorite")
    }
    params.delete("page")
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Button type="submit" variant='ghost' className={cn(className)} size='icon' onClick={handleFilter}>
      {heart}
    </Button>
  )
}