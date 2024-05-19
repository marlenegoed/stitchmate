'use client'

import {HiMiniHeart} from 'react-icons/hi2'
import {HiOutlineHeart} from 'react-icons/hi2'
import {Button} from '../ui/button'
import {useState} from 'react'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'

export default function FilterProjectFavorites() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const checked = searchParams.get("favorite") === '1'

  function handleFilter() {
    const params = new URLSearchParams(searchParams)
    if (!checked) {
      params.set("favorite", "1")
    } else {
      params.delete("favorite")
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <Button type="submit" className='shadow bg-inherit hover:shadow-md hover:bg-inherit transition-shadow' size='icon' onClick={handleFilter}>
        <HiMiniHeart className='text-slate-800' />
      </Button >
    </>
  )
}