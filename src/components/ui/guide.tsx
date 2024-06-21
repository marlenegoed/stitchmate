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
import {HiReply} from "react-icons/hi";
import {HiOutlineVolumeUp} from "react-icons/hi";
import {HiOutlineRefresh} from "react-icons/hi";


import guide_01 from "../../../public/guide_01.svg";
import guide_02 from "../../../public/guide_02.svg";
import sketch_ui_toolbar from "../../../public/sketch_ui_toolbar.svg";


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
    <SlideLayout className="bg-goldenrod-100/50 ">
      <GuideHeading> 3 minutes til cast on!</GuideHeading>
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
      <div className='flex items-end mx-auto self-end w-8/12 h-full	'>
        <span className='w-10 h-10 animate-ping absolute bottom-24 left-[40rem]'>
          <svg width="100%" height="100%" viewBox="0 0 259 259" version="1.1"><g><circle cx="129.167" cy="129.167" r="125" className="fill-transparent stroke-white stroke-[10px]" /><circle cx="129.167" cy="129.167" r="95.833" className="fill-transparent stroke-white stroke-[10px]" /><circle cx="129.167" cy="129.167" r="62.5" className="fill-transparent stroke-white stroke-[10px]" /></g></svg>
        </span>
        <Image src={guide_02} alt='' />
      </div>
    </SlideLayout>

  )
}

function ToolbarSlide() {
  return (
    <SlideLayout className="bg-prussian-200">
      <div className="flex">
        <GuideHeading>Toolbar</GuideHeading>
        <div className="w-3/12 m-auto">
          <Image
            src={sketch_ui_toolbar}
            alt=''
          >
          </Image>
        </div>
      </div>
      <GuideParagraph>At the top you’ll find the toolbar. Take a look at the first 3 actions:</GuideParagraph>

      <GuideParagraph className="flex">
        <HiReply />
        <span className="font-semibold">unravel: </span> turn audio feedback on and off to fit your preferences
      </GuideParagraph>
      <GuideParagraph className="flex">
        <HiOutlineVolumeUp />
        <span className="font-semibold">click sounds: </span>turn audio feedback on and off to fit your preferences
      </GuideParagraph>
      <GuideParagraph className='flex'>
        <HiOutlineRefresh />
        <span className="font-semibold">reset: </span>wipe the current counter clean and start from the beginning.
      </GuideParagraph>

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
    <p className={cn("font-medium text-lg leading-normal pr-4", className)}>{children}</p>
  )
}


function SlideLayout({children, className}: {children: ReactNode, className?: string}) {
  return (
    <CarouselItem className={cn("p-10 pb-0 rounded-t-lg", className)}>
      {children}
    </CarouselItem>
  )
}