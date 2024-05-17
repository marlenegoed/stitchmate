'use client'

// import {HiAdjustmentsHorizontal} from "react-icons/hi2";
import {HiMiniMinus, HiOutlinePlus} from "react-icons/hi2";
import {HiOutlineSpeakerWave} from "react-icons/hi2";
import {HiOutlineSpeakerXMark} from "react-icons/hi2";
import {HiOutlineBookmarkSquare} from "react-icons/hi2";
import {HiOutlineDocumentDuplicate} from "react-icons/hi2";

import {Section, cloneSection, createNewSection, setActiveSection} from '@/database/queries/projects';
import {Button} from '../ui/button';
import Link from 'next/link';
import {updateCount} from '@/database/queries/projects';
import {useCounterStore} from '@/providers/counter-store-provider';
import SectionDialog from './section-dialog';
import ResetDialog from './reset-dialog';
import {HiOutlineArrowUturnLeft} from "react-icons/hi2";
import {HiMiniAdjustmentsVertical} from "react-icons/hi2";
import {HiOutlinePlusCircle} from "react-icons/hi2";




interface AddSectionProps {
  projectId: number,
  position: number
}

export function AddSection({projectId, position}: AddSectionProps) {

  async function handleNewSection() {
    const newPosition = position + 1
    const newSectionTitle = `Section ${newPosition}`
    await createNewSection(projectId, newPosition, newSectionTitle)
  }

  return (
    <Button type='button' size='icon' variant='ghost' className='border-slate-800' onClick={handleNewSection}><HiOutlinePlusCircle size={24} /></Button>
  )
}


export function CountDown({sectionId}: {sectionId: number}) {

  const {storeCount, countStoreDown} = useCounterStore(
    (state) => state,
  )

  async function handleCountDown() {
    let newCount = storeCount

    if (storeCount > 1) {
      newCount = storeCount - 1
      countStoreDown()
    }

    if (newCount <= 1) {newCount = 1}

    await updateCount(sectionId, newCount)
    await setActiveSection(sectionId)
  }

  return (
    <Button type='button' size='icon' variant='ghost' className='border-slate-800' onClick={handleCountDown} ><HiOutlineArrowUturnLeft size={20} /></Button>
  )
}


export function CloneSection({section}: {section: Section}) {

  async function handleClick() {
    await cloneSection(section)
  }

  return (
    <Button type='button' size='icon' variant='ghost' className='border-slate-800' onClick={handleClick}><HiOutlineDocumentDuplicate size={24} /></Button>

  )

}

export function AddReminderButton({sectionId}: {sectionId: number}) {

  return (
    <Link href={`/sections/${sectionId}/reminder/new`}>
      <Button type='button' size='icon' variant='ghost' className='border-slate-800'><HiOutlineBookmarkSquare size={24} /></Button>
    </Link>
  )
}




export default function CounterActions({section}: {section: Section}) {

  // shadow-[0_3px_3px_-2px_rgba(0,0,0,0.1)]

  return (
    <div className='flex gap-6 mt-4 pb-4 w-full justify-center text-slate-700 opactiy-80'>
      <CountDown sectionId={section.id} />
      {/* <Button type='button' size='icon' variant='ghost' className='border-slate-800'><HiArrowUpTray size={24} /></Button> */}
      <Button type='button' size='icon' variant='ghost' className='border-slate-800'><HiOutlineSpeakerWave size={24} /></Button>
      <ResetDialog setOpen={() => true} sectionId={section.id} />
      <CloneSection section={section} />
      <AddSection projectId={section.projectId} position={section.position}></AddSection>
      <SectionDialog section={section}></SectionDialog>

    </div>
  )

} 