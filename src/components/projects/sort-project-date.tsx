'use client'

import {HiOutlineArrowsUpDown} from 'react-icons/hi2';
import {Button} from '../ui/button';
import {useState} from 'react';

export default function SortProjectDate({direction}: {direction?: string | string[]}) {
  const [value, setValue] = useState(direction)

  function handleClick() {
    let nextDirection = 'asc'
    if (direction && direction === "asc") {
      nextDirection = 'desc'
    }
    setValue(nextDirection)
  }

  return (
    <div className='flex flex-row gap-2'>
      <input type="hidden" name="order" value={value} />
      {/* <span className='h-[40px] border-l-2 border-neutral-500 py-2' /> */}
      <Button type="submit" size='icon' className='hover:shadow-md hover:bg-inherit transition-shadow w-32 shadow bg-inherit text-slate-800 text-left' onClick={handleClick}>
        <HiOutlineArrowsUpDown className='mr-2' />
        last edit
      </Button>
    </div>
  )
}