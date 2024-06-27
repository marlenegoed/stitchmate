'use client'

import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselDotButtons,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {HiX} from "react-icons/hi";
import {ReactNode, useState} from 'react';
import {cn} from '@/lib/utils';
import {useUser} from '@clerk/nextjs';
import Image from 'next/image'

import guide_01 from "../../../public/guide_01.svg";
import guide_02 from "../../../public/guide_02.svg";
import guide_03 from "../../../public/guide_03.svg";
import guide_04 from "../../../public/guide_04.svg";
import guide_05 from "../../../public/guide_05.svg";
import highlight_01 from "../../../public/highlight_01.svg";

import {CgMenuGridO} from 'react-icons/cg';
import {HiAdjustmentsVertical, HiArrowPath, HiArrowUturnLeft, HiMiniHeart, HiOutlinePlusCircle, HiOutlineSpeakerWave, HiOutlineSquare2Stack, HiOutlineSquares2X2} from 'react-icons/hi2';
import {useUserSettingsStore} from '@/providers/user-settings-store-provider';
import {toggleGuide} from '@/database/queries/queries';
import {useMediaQuery} from '@/lib/use-media-query';
import {Drawer, DrawerTrigger, DrawerContent} from './drawer';
import {ScrollArea} from './scroll-area';
import clsx from 'clsx';

export default function Guide() {

  const {isSignedIn, user} = useUser()
  const {showGuide} = useUserSettingsStore(state => state)
  const [isOpen, setIsOpen] = useState(showGuide)
  const isDialog = useMediaQuery("(min-width: 768px)")

  if (isDialog) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild className='relative'>
          <Button size="icon" className="fixed z-50 bottom-6 right-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 font-semibold rounded-full text-xl text-white bg-black">?</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[520px] p-0 bg-white">
          <DialogClose className="absolute right-6 top-6 z-50"><HiX />
          </DialogClose>
          <CarouselSlides isSignedIn={isSignedIn || false} setIsOpen={() => setIsOpen} userId={user?.id} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size="icon" className="fixed z-50 bottom-6 right-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 font-semibold rounded-full text-xl text-white bg-black">?</Button>
      </DrawerTrigger>
      <DrawerContent className='bg-neutral-50 max-h-full rounded-none'>
        {/* <ScrollArea className='overflow-y-auto p-4 max-w-lg flex justify-center flex-col mx-auto'> */}
        <MobileGuide isSignedIn={isSignedIn || false} setIsOpen={() => setIsOpen} userId={user?.id} />
        {/* </ScrollArea> */}
      </DrawerContent>
    </Drawer >
  )
}


interface SlideProps {
  isSignedIn: boolean,
  setIsOpen: () => void,
  userId?: string,
}

function MobileGuide({isSignedIn, setIsOpen, userId}: SlideProps) {

  return (
    <div className='w-full overflow-auto'>
      <DemoStartSlide isSignedIn={isSignedIn} />
      <CountRowsSlide />
      <ToolbarSlide />
      <NameSectionSlide />
      <TrackProgressSlide />
      <AddReminderSlide />
      <ReminderNotesSlide />
      <FollowPatternSlide />
      <ManageProjectsSlide />
      <ContactSlide setIsOpen={() => setIsOpen} userId={userId} />
    </div>
  )
}


function CarouselSlides({isSignedIn, setIsOpen, userId}: SlideProps) {

  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <DemoStartSlide isSignedIn={isSignedIn} />
        </CarouselItem>
        <CarouselItem>
          <CountRowsSlide />
        </CarouselItem>
        <CarouselItem>
          <ToolbarSlide />
        </CarouselItem>
        <CarouselItem>
          <NameSectionSlide />
        </CarouselItem>
        <CarouselItem>
          <TrackProgressSlide />
        </CarouselItem>
        <CarouselItem>
          <AddReminderSlide />
        </CarouselItem>
        <CarouselItem>
          <ReminderNotesSlide />
        </CarouselItem>
        <CarouselItem>
          <FollowPatternSlide />
        </CarouselItem>
        <CarouselItem>
          <ManageProjectsSlide />
        </CarouselItem>
        <CarouselItem>
          <ContactSlide setIsOpen={() => setIsOpen} userId={userId} />
        </CarouselItem>
      </CarouselContent>
      <GuideNavigation />
    </Carousel>
  )
}


function DemoStartSlide({isSignedIn}: {isSignedIn?: boolean}) {

  let intro = isSignedIn
    ? <GuideParagraph>Follow this short guide to understand how stitchmate works.</GuideParagraph>
    : <GuideParagraph>Follow this short guide to understand how stitchmate works. You are currently in the demo version. Sign In for free to access all features.</GuideParagraph>

  return (
    <SlideLayout className="bg-neutral-50">
      <div className='flex flex-col'>
        <GuideHeading> It&apos;s 3 minutes til cast on!</GuideHeading>
        {intro}
      </div>
      <div className="w-8/12 mt-auto mx-auto">
        <Image
          src={guide_01}
          alt=''
          priority={true}
        >
        </Image>
      </div>
    </SlideLayout>
  )
}

function CountRowsSlide() {

  const isDialog = useMediaQuery("(min-width: 768px)")

  return (
    <SlideLayout>
      <GuideHeading>Count rows</GuideHeading>
      <GuideParagraph>Count rows by tapping the blob counter. Note that blobs change appearence, so yours might look differently.</GuideParagraph>
      <div className='w-10/12 mt-auto mx-auto'>
        <span className={clsx({'w-14 h-14 animate-ping absolute bottom-24 left-[42rem]': isDialog}, {'hidden': !isDialog})}>
          <svg width="100%" height="100%" viewBox="0 0 259 259" version="1.1"><g><circle cx="129.167" cy="129.167" r="125" className="fill-transparent stroke-white stroke-[10px]" /><circle cx="129.167" cy="129.167" r="95.833" className="fill-transparent stroke-white stroke-[10px]" /><circle cx="129.167" cy="129.167" r="62.5" className="fill-transparent stroke-white stroke-[10px]" /></g></svg>
        </span>
        <Image src={guide_02} alt='' />
      </div>
    </SlideLayout>
  )
}

function ToolbarSlide() {
  return (
    <SlideLayout>
      <GuideHeading>Toolbar</GuideHeading>
      <div className="grid grid-cols-6 gap-y-4">
        <div className="rounded-full text-white bg-black h-8 w-8 flex justify-center items-center shrink-0 mt-2"><CgMenuGridO /></div>
        <GuideParagraph className='col-span-5 mb-0'>You can toggle the toolbar by clicking the button in the upper right corner. Take a look at the first 3 actions:</GuideParagraph>

        <HiArrowUturnLeft className='ml-1 mt-1' size={20} />
        <GuideParagraph className='col-span-5 mb-0'>
          Count down if you need to unravel
        </GuideParagraph>

        <HiOutlineSpeakerWave className='ml-1 mt-1' size={20} />
        <GuideParagraph className='col-span-5 mb-0'>
          Turn audio feedback on and off
        </GuideParagraph>

        <HiArrowPath className='ml-1 mt-1' size={20} />
        <GuideParagraph className='col-span-5 mb-0'>
          Wipe the current counter clean and start from the beginning
        </GuideParagraph>

      </div>
    </SlideLayout>
  )
}

function NameSectionSlide() {

  return (
    <SlideLayout className=''>
      <GuideHeading>Name your section</GuideHeading>
      <GuideParagraph>In the upper left corner you can change your section title. This becomes more useful once you have multiple sections.</GuideParagraph>
      <div className="w-10/12 mx-auto mt-auto">
        <Image
          src={guide_03}
          alt=''
        >
        </Image>
      </div>
    </SlideLayout>
  )
}

function TrackProgressSlide() {

  return (
    <SlideLayout className=''>

      <GuideHeading className='mb-6'>Track progress</GuideHeading>
      <div className='flex flex-row gap-4 w-full items-start sm:mb-10'>
        < HiAdjustmentsVertical size={30} className='text-gray-800 shrink-0 mt-1' />
        <GuideParagraph>In the toolbar, you&apos;ll find the section settings. Enter your final row number in the dialog and save your changes. <br></br> A progress bar is going to appear.</GuideParagraph>
      </div >

      <div className='flex flex-row justify-between items-end px-4'>
        <Image
          src={highlight_01}
          alt=''
          width={30}
        />

        <div className='flex'>
          <div className='h-2 w-[100px] bg-sienna-300 rounded-l-full'></div>
          <div className='h-2 w-[100px] bg-neutral-200 rounded-r-full'></div>
        </div>

        <Image
          src={highlight_01}
          alt=''
          width={30}
          style={{transform: "scaleX(-1)"}}
        />

      </div>


    </SlideLayout >
  )
}

function AddReminderSlide() {
  return (
    <SlideLayout className='mb-0'>
      <GuideHeading>Add Reminder</GuideHeading>
      <GuideParagraph className='mb-0'>Stitchmate can remind you of repetitive actions.</GuideParagraph>
      <div className="w-1/3 mx-auto mb-6">
        <Image
          src={guide_04}
          alt=''
        >
        </Image>
      </div>
      <GuideParagraph className='mb-0'>Use the button in the down right corner to configure a new reminder. Once you hit the row, voilà - the reminder is shown! Genius, right?</GuideParagraph>
    </SlideLayout>
  )
}

function ReminderNotesSlide() {
  return (
    <SlideLayout className='pt-4 sm:px-12 sm:pt-12'>
      <GuideParagraph className='mb-3'>You can access and change all your reminder notes by tapping the prompt or the cards in the gallery.</GuideParagraph>
      <div className="w-10/12 mx-auto mt-3 mb-6">
        <Image
          src={guide_05}
          alt=''
        >
        </Image>
      </div>
      <GuideParagraph className="text-gray-900 pb-0 font-semibold mb-2">Tip: smart notes</GuideParagraph>
      <GuideParagraph className='mb-0'>You can snooze reminders so they don’t prompt. While snoozed, they can act as simple notes. Think of all your pattern mods: they become so easy to recreate! </GuideParagraph>
    </SlideLayout>
  )
}

function FollowPatternSlide() {

  return (
    <SlideLayout className='sm:px-12 sm:pt-12'>
      <GuideHeading>Follow your pattern</GuideHeading>
      <GuideParagraph className='col-span-5'>Back in the toolbar, we have 2 actions left:</GuideParagraph>
      <div className="grid grid-cols-6 gap-y-2 px-4">
        <HiOutlinePlusCircle className='ml-1 mt-1' size={24} />
        <GuideParagraph className='col-span-5'>
          <span className='font-semibold'>add section: </span>each section comes with its own count and reminders. You can add new sections by following the sections of your pattern.
        </GuideParagraph>

        <HiOutlineSquare2Stack className='ml-1 mt-1' size={24} />
        <GuideParagraph className='col-span-5 mb-0'>
          <span className='font-semibold'>clone section: </span>create a clone of your current section, copying all reminders. This is useful for similar parts of your project, e.g. for sleeves, heels or cuffs.
        </GuideParagraph>

      </div>
    </SlideLayout>
  )
}

function ManageProjectsSlide() {

  return (
    <SlideLayout className=''>

      <GuideHeading className='mb-6'>Manage projects</GuideHeading>
      <div className='flex flex-row gap-4 w-full items-start mb-4'>
        <HiOutlineSquares2X2 size={24} className='text-gray-800 shrink-0 mt-1' />
        <GuideParagraph>Singed In and entering the projects page you can organize all your projects with ease. Add details, such as yarn, needles and gauge. You can even pick a favourite colour for the blob!</GuideParagraph>
      </div >
      <div className="w-full h-36 bg-[url('/guide_07.svg')] bg-no-repeat bg-[length:480px_480px]	bg-center">
      </div>

    </SlideLayout >
  )
}


function ContactSlide({userId, setIsOpen}: {userId?: string, setIsOpen: () => void}) {

  const {hideGuide, showGuide} = useUserSettingsStore(state => state)

  async function handleClose() {
    hideGuide()

    if (userId && showGuide) {
      await toggleGuide(userId)
    }
  }

  return (
    <SlideLayout className=''>
      <GuideHeading>Contact & Help</GuideHeading>
      <GuideParagraph>Don’t worry, if you couldn’t memorize everything at once. You can access this guide at any time. </GuideParagraph>
      <GuideParagraph>However, if you need additional support please <a className='text-gray-900' href='mailto:stitchmate.contact@gmail.com'>contact me.</a></GuideParagraph>
      <GuideParagraph className='mb-8'><HiMiniHeart className='inline mr-2 text-sienna-300' />Happy making!</GuideParagraph>

      <DialogClose className='self-end' asChild>
        <Button className='w-fit sm:text-lg font-semibold' onClick={handleClose} >close guide</Button>
      </DialogClose>
    </SlideLayout>
  )
}


function GuideNavigation() {
  return (
    <div className="flex flex-row h-20 items-center justify-center">
      <CarouselPrevious />
      <CarouselDotButtons />
      <CarouselNext />
    </div>
  )
}

function GuideHeading({children, className}: {children: ReactNode, className?: string}) {
  return (
    <h2 className={cn("text-xl sm:text-2xl text-gray-900 font-semibold mb-4", className)}>{children}</h2>
  )
}

function GuideParagraph({children, className}: {children: ReactNode, className?: string}) {
  return (
    <p className={cn("font-medium text-neutral-500 text-base sm:text-lg leading-normal mb-6", className)}>{children}</p>
  )
}

function SlideLayout({children, className}: {children: ReactNode, className?: string}) {
  return (
    <div className={cn('flex flex-col rounded-t-lg px-4 pt-8 mb-8 sm:mb-0 sm:px-16 sm:pt-16 h-full bg-neutral-50', className)}>
      {children}
    </div >
  )
}