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
import {ReactNode} from 'react';
import {cn} from '@/lib/utils';
import {useUser} from '@clerk/nextjs';
import Image from 'next/image'
import {RiArrowDropDownFill, RiArrowDropUpFill} from "react-icons/ri";



import guide_01 from "../../../public/guide_01.svg";
import guide_02 from "../../../public/guide_02.svg";
import guide_03 from "../../../public/guide_03.svg";
import arrow_straight from "../../../public/arrow_straight.svg";
import stars from "../../../public/stars.svg";

import {CgMenuGridO} from 'react-icons/cg';
import {HiAdjustmentsVertical, HiArrowPath, HiArrowUturnLeft, HiOutlineSpeakerWave} from 'react-icons/hi2';


export default function Guide() {

  const {isSignedIn} = useUser()

  return (
    <>
      <Dialog>
        <DialogTrigger asChild className='relative'>
          <Button size="icon" className="fixed z-50 bottom-6 right-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 font-semibold rounded-full text-xl text-white bg-black">?</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[440px] p-0 bg-white">

          <DialogClose className="absolute right-0 top-0 z-50" asChild>
            <Button type="button" variant="nohover" size="icon">
              <HiX />
            </Button>
          </DialogClose>

          <Carousel>
            <CarouselContent>
              {!isSignedIn && <DemoStartSlide />}
              <CountRowsSlide />
              <ToolbarSlide />
              <NameSectionSlide />
              <NameSectionSlide />
              <NameSectionSlide />
              <NameSectionSlide />

              {/* <TrackProgressSlide /> */}
              <AddReminderSlide />

            </CarouselContent>

            <GuideNavigation />
          </Carousel>

        </DialogContent>
      </Dialog>
    </>
  )
}


function DemoStartSlide() {

  return (
    <SlideLayout className="bg-goldenrod-100">
      <GuideHeading> It&apos;s 3 minutes til cast on!</GuideHeading>
      <GuideParagraph>Follow this short guide to understand how stitchmate works.</GuideParagraph>
      <GuideParagraph className="opacity-50 pb-10"> You are currently in the demo version. Sign In for free to access all features.</GuideParagraph>
      <div className="w-10/12 m-auto">
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
    <SlideLayout className="bg-neutral-100">
      <GuideHeading>Count rows</GuideHeading>
      <GuideParagraph>Count rows by tapping the blob counter. Note that blobs change appearence, so yours might look differently.</GuideParagraph>
      <div className='w-8/12 mt-auto mx-auto'>
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
    <SlideLayout className="bg-prussian-100">
      <div className="flex w-full justify-between">
        <GuideHeading>Toolbar</GuideHeading>
        <div className="rounded-full text-white bg-black h-10 w-10 flex justify-center items-center"><CgMenuGridO /></div>
      </div>
      <GuideParagraph>You can toggle the toolbar by clicking the button in the upper right corner. Take a look at the first 3 actions:</GuideParagraph>

      <div className="flex gap-4">
        <HiArrowUturnLeft size={22} />
        <GuideParagraph>
          Count down if you need to unravel
        </GuideParagraph>
      </div>

      <div className="flex gap-4">
        <HiOutlineSpeakerWave size={22} />
        <GuideParagraph>
          Turn audio feedback on and off
        </GuideParagraph>
      </div>

      <div className="flex gap-4">
        <HiArrowPath size={30} />
        <GuideParagraph>
          Wipe the current counter clean and start from the beginning
        </GuideParagraph>
      </div>

    </SlideLayout>
  )
}

function NameSectionSlide() {

  return (
    <SlideLayout className="bg-goldenrod-100">
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
    <SlideLayout className="bg-neutral-100">
      <GuideHeading>Track progress</GuideHeading>
      <GuideParagraph>In the toolbar, you&apos;ll find the section settings.</GuideParagraph>
      <div className='flex flex-row gap-4 w-full items-center'>
        <HiAdjustmentsVertical size={30} className='text-gray-800 ' />
        <Image src={arrow_straight} alt='' width={50} />
        <div className='h-10 w-20 border rounded-lg border-neutral-400 flex flex-row justify-between items-center pr-1 pl-2'>
          <p>23</p>
          <div className="flex flex-col">
            <RiArrowDropUpFill />
            <RiArrowDropDownFill />
          </div>
        </div>
      </div>

      <GuideParagraph>Enter your final row number in the dialog and save your changes. A progress bar is going to appear.</GuideParagraph>

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
    <SlideLayout className="bg-neutral-100 grid col-span-1">
      <GuideHeading>Add Reminder</GuideHeading>
      <GuideParagraph>Stitchmate can remind you of repetitive actions.</GuideParagraph>
      <div className="w-1/2 mx-auto ">
        <Image src={guide_03} alt='' />
      </div>
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
    <h2 className={cn("text-2xl text-gray-800 font-semibold mb-6", className)}>{children}</h2>
  )
}

function GuideParagraph({children, className}: {children: ReactNode, className?: string}) {
  return (
    <p className={cn("font-medium text-base leading-normal pb-4 pr-4", className)}>{children}</p>
  )
}

function SlideLayout({children, className}: {children: ReactNode, className?: string}) {
  return (
    <CarouselItem>
      <div className={cn('flex flex-col rounded-t-lg', className)}>
        {children}
      </div>
    </CarouselItem>
  )
}