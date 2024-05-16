'use client'

import Link from 'next/link'
import {Button} from '../ui/button'
import Title from '../ui/title'
import {FiPlus} from 'react-icons/fi'
import {HiMiniHeart} from "react-icons/hi2";
import {HiMiniSquaresPlus} from "react-icons/hi2";
import {HiOutlineSquaresPlus} from "react-icons/hi2";
import {Input} from '../ui/input';
import {HiOutlineArrowsUpDown} from "react-icons/hi2";
import {HiOutlineMagnifyingGlass} from "react-icons/hi2";
import {HiClock} from "react-icons/hi2";
import ProjectDialog from './project-dialog';



interface ProjectListProps {

}

export default function ProjectList() {
  return (
    <>
      <ProjectListHeader />
    </>
  )
}


export function ProjectListHeader() {

  return (
    <div className='flex flex-row justify-between w-full items-center px-6'>
      <Title className='my-4'>My Projects</Title>
      <div className='flex flex-row gap-4'>
        <FilterProjectFavorites />
        <SortProjectDates />
        <ProjectListSearch />
      </div>
      <AddNewProject />
    </div>
  )

}


export function FilterProjectFavorites(){
  return (
    <Button className='shadow bg-inherit hover:shadow-md hover:bg-inherit transition-shadow' size='icon'><HiMiniHeart className='text-slate-800' /></Button>
  )
}

export function SortProjectDates() {
  return (
    <div className='flex flex-row gap-2'>
      {/* <span className='h-[40px] border-l-2 border-neutral-500 py-2' /> */}
      <Button size='icon' className='  hover:shadow-md hover:bg-inherit transition-shadow w-32 shadow bg-inherit text-slate-800 text-left'><HiOutlineArrowsUpDown className='mr-2'/>last edit</Button>
    </div>
  )
}

export function ProjectListSearch() {

  return (
    <div className=''>
      < HiOutlineMagnifyingGlass className='text-slate-800 absolute mt-3 ml-4' />
      <Input placeholder='search Titles' variant='inline' className='placeholder:text-slate-800 pl-10 text-base rounded-full bg-neutral-200 h-10' >
      </Input>

    </div>
  )

}


export function ProjectCards() {

}

export function AddNewProject() {


  return (
    <ProjectDialog />

    // // <Link href='/projects/new'>
    //   // <Button size="icon" variant="ghost" className='text-sienna-500'><HiOutlineSquaresPlus size={24} /></Button>
    // </Link>
  )
}