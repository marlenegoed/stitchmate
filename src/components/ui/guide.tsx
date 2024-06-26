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
import stars from "../../../public/stars.svg";

import {CgMenuGridO} from 'react-icons/cg';
import {HiAdjustmentsVertical, HiArrowPath, HiArrowUturnLeft, HiOutlineSpeakerWave} from 'react-icons/hi2';
import {useUserSettingsStore} from '@/providers/user-settings-store-provider';


export default function Guide() {

  const {isSignedIn} = useUser()
  const {showGuide} = useUserSettingsStore(state => state)
  const [isOpen, setIsOpen] = useState(showGuide)

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild className='relative'>
          <Button size="icon" className="fixed z-50 bottom-6 right-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 font-semibold rounded-full text-xl text-white bg-black">?</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[440px] p-0 bg-white">

          <DialogClose className="absolute right-3 top-3 z-50"><HiX />
          </DialogClose>

          <Carousel>
            <CarouselContent>
              <DemoStartSlide isSignedIn />
              <CountRowsSlide />
              <ToolbarSlide />
              <NameSectionSlide />
              <TrackProgressSlide />
              <AddReminderSlide />
              <ReminderNotesSlide />
              <ContactSlide setIsOpen={() => setIsOpen} />

            </CarouselContent>

            <GuideNavigation />
          </Carousel>

        </DialogContent>
      </Dialog>
    </>
  )
}


function DemoStartSlide({isSignedIn}: {isSignedIn: boolean}) {

  let intro = isSignedIn
    ? <GuideParagraph>Follow this short guide to understand how stitchmate works.</GuideParagraph>
    : <GuideParagraph>Follow this short guide to understand how stitchmate works. You are currently in the demo version. Sign In for free to access all features.</GuideParagraph>

  return (
    <SlideLayout className="bg-neutral-50">
      <GuideHeading> It&apos;s 3 minutes til cast on!</GuideHeading>
      {intro}
      <div className="w-8/12 mt-auto mx-auto">
        <Image
          src={guide_01}
          alt=''
        >
        </Image>
      </div>
    </SlideLayout>
  )
}

function CountRowsSlide() {
  return (
    <SlideLayout>
      <GuideHeading>Count rows</GuideHeading>
      <GuideParagraph>Count rows by tapping the blob counter. Note that blobs change appearence, so yours might look differently.</GuideParagraph>
      <div className='w-10/12 mt-auto mx-auto'>
        <span className='w-14 h-14 animate-ping absolute bottom-24 left-[36rem]'>
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
      <div className="flex w-full justify-between">
        <GuideHeading>Toolbar</GuideHeading>
        <div className="rounded-full text-white bg-black h-8 w-8 flex justify-center items-center"><CgMenuGridO /></div>
      </div>
      <GuideParagraph>You can toggle the toolbar by clicking the button in the upper right corner. Take a look at the first 3 actions:</GuideParagraph>

      <div className="flex gap-4">
        <HiArrowUturnLeft className='mt-1' />
        <GuideParagraph>
          Count down if you need to unravel
        </GuideParagraph>
      </div>

      <div className="flex gap-4">
        <HiOutlineSpeakerWave className='mt-1' />
        <GuideParagraph>
          Turn audio feedback on and off
        </GuideParagraph>
      </div>

      <div className="flex gap-4">
        <HiArrowPath className='mt-[1px]' size={24} />
        <GuideParagraph>
          Wipe the current counter clean and start from the beginning
        </GuideParagraph>
      </div>

    </SlideLayout>
  )
}

function NameSectionSlide() {

  return (
    <SlideLayout>
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
    <SlideLayout>
      <div className='flex flex-row gap-4 w-full items-center'>
        <GuideHeading>Track progress</GuideHeading>
        <HiAdjustmentsVertical size={30} className='text-gray-800 ' />
      </div>
      <GuideParagraph>In the toolbar, you&apos;ll find the section settings. Enter your final row number in the dialog and save your changes. A progress bar is going to appear.</GuideParagraph>

      <Image
        width={30}
        src={stars}
        alt=''
      >
      </Image>
      <div className='flex'>
        <div className='h-2 w-[200px] bg-viridian-200 rounded-l-full'></div>
        <div className='h-2 w-[100px] bg-neutral-200 rounded-r-full'></div>
      </div>

    </SlideLayout>
  )
}

function AddReminderSlide() {
  return (
    <SlideLayout>
      <GuideHeading>Add Reminder</GuideHeading>
      <GuideParagraph>Stitchmate can remind you of repetitive actions.</GuideParagraph>
      <div className="w-1/3 mx-auto">
        <Image
          src={guide_04}
          alt=''
        >
        </Image>
      </div>
      <GuideParagraph>Use the button in the down right corner to configure a new reminder. Once you hit the row, voilà - the reminder is shown! Genius, right?</GuideParagraph>
    </SlideLayout>
  )
}

function ReminderNotesSlide() {
  return (
    <SlideLayout>
      <GuideParagraph>You can access and change all your reminder notes by tapping the prompt or the cards in the gallery.</GuideParagraph>
      <div className="w-1/3 mx-auto">
        <Image
          src={guide_04}
          alt=''
        >
        </Image>
      </div>
      <GuideParagraph className="text-gray-900 pb-0 font-semibold">Tip: smart notes</GuideParagraph>
      <GuideParagraph>You can snooze reminders so they don’t prompt. While snoozed, they can act as simple notes. Think of all your pattern mods: they become so easy to recreate! </GuideParagraph>
    </SlideLayout>
  )
}

function ContactSlide({setIsOpen}: {setIsOpen: () => void}) {

  const {hideGuide} = useUserSettingsStore(state => state)

  // function hideDialog() {
  //   toggleShowGuide()
  //   setIsOpen()
  // }

  return (
    <SlideLayout>
      <GuideHeading>Contact & Help</GuideHeading>
      <GuideParagraph>You can access and change all your reminder notes by tapping the prompt or the cards in the gallery.</GuideParagraph>
      <DialogClose asChild>
        <Button onClick={hideGuide} >close guide</Button>
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
    <h2 className={cn("text-2xl text-gray-900 font-semibold mb-3", className)}>{children}</h2>
  )
}

function GuideParagraph({children, className}: {children: ReactNode, className?: string}) {
  return (
    <p className={cn("font-medium text-neutral-500 text-lg leading-normal pb-4 pr-4", className)}>{children}</p>
  )
}

function SlideLayout({children, className}: {children: ReactNode, className?: string}) {
  return (
    <CarouselItem>
      <div className={cn('flex flex-col rounded-t-lg p-10 pb-0 h-full bg-neutral-50', className)}>
        {children}
      </div>
    </CarouselItem>
  )
}