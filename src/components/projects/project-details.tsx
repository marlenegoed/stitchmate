import {useState} from 'react';
import {Button} from '../ui/button';
import {
  DrawerDialog,
  DrawerDialogContent,
  DrawerDialogHeader,
  DrawerDialogTrigger,
  DrawerDialogFooter,
  DrawerDialogClose,
  DrawerDialogTitle
} from '../ui/drawer-dialog';
import {HiChevronDoubleDown, HiChevronDoubleUp, HiLink, HiOutlineListBullet} from "react-icons/hi2";
import {TbListDetails} from "react-icons/tb";

import {ProjectDetailsType, Project} from '@/database/queries/queries';
import moment from 'moment';
import {HiCalendarDays} from "react-icons/hi2";
import Link from 'next/link';
import {ScrollArea, ScrollBar} from '../ui/scroll-area';
import SectionContainer from '../ui/section-container';
import {Label} from '../ui/label';
import {PatternRadioGroupItem} from '../ui/radio-group-patterns';
import Image from 'next/image'

import pattern1 from '../../../public/pattern1_sm.png'
import pattern2 from '../../../public/pattern2_sm.png'
import pattern3 from '../../../public/pattern3_sm.png'
import pattern4 from '../../../public/pattern4_sm.png'
import pattern5 from '../../../public/pattern5_sm.png'
import pattern6 from '../../../public/pattern6_sm.png'
import pattern7 from '../../../public/pattern7_sm.png'
import pattern8 from '../../../public/pattern8_sm.png'
import clsx from 'clsx';


const patterns = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6, pattern7, pattern8]

export default function ProjectDetails({project, projectDetails}: {project: Project, projectDetails: ProjectDetailsType}) {

  const [open, setOpen] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const startDate = moment(project.createdAt).format('MMMM Do YYYY')
  const daysSince = moment(project.createdAt).startOf('day').fromNow()


  return (
    <DrawerDialog open={open} setOpen={setOpen} direction='top'>

      <DrawerDialogTrigger>
        <Button
          className='rounded-full'
          type='button'
          size='icon'
        >
          <TbListDetails size={22} />
        </Button>
      </DrawerDialogTrigger>
      <DrawerDialogContent dialogClass="bg-neutral-100" drawerClass='bg-neutral-100'>
        <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4 space-y-4">

          <DrawerDialogHeader>
            <SectionContainer className='flex justify-between items-center'>
              <div>
                <Label variant='sectionlabel'>title</Label>
                <DrawerDialogTitle>{project.title}</DrawerDialogTitle>
              </div>

              <div className='flex relative'>
                <div className=' top-0 right-4 absolute z-10 h-8 w-8 bg-stone-300 rounded-full'>
                  <Image
                    alt="pattern"
                    src={patterns[project.patternId - 1]}
                    fill
                    sizes="400px"
                    style={{
                      objectFit: 'cover', // cover, contain, none
                    }}
                  />
                </div>
                <div className={`h-8 w-8 rounded-full bg-${project.color}`} />
              </div>

            </SectionContainer>
          </DrawerDialogHeader>

          <SectionContainer>
            <Label variant='sectionlabel'>description</Label>

            {project.description ?
              <>
                <ScrollArea className={clsx('w-full', {'h-28': !showFullDescription, 'h-fit': showFullDescription})}>
                  <p className='text-base mr-2'>{project.description}</p>
                  <ScrollBar orientation="vertical" className='bg-white transition-colors transition-duration-150 ease-out' />
                </ScrollArea>
                <Button
                  variant='ghost'
                  className='font-normal text-sm text-neutral-400 gap-1 justify-start p-0 h-6 mt-2'
                  onClick={() => setShowFullDescription((oldValue) => !oldValue)}
                >
                  {!showFullDescription ? 'show more' : 'show less'}
                  {!showFullDescription ? <HiChevronDoubleDown /> : <HiChevronDoubleUp />}
                </Button>
              </>
              :
              <button
                className='w-full h-28'
                onClick={() => console.log('clicked')}
              >
                <div className='h-full w-full bg-dotted-spacing-4 bg-dotted-gray-200 flex items-center justify-center'>
                  <p className='text-gray-300 italic bg-white'>no notes added yet...</p>
                </div>
              </button>
            }

          </SectionContainer>

          <SectionContainer className='flex justify-between'>
            <div>
              <Label variant='sectionlabel'>status</Label>
              <div className='bg-sienna-100 rounded-lg h-6 w-fit px-2'><span>{project.status}</span></div>
            </div>
            <div>
              <p>started</p>
              <span className='flex gap-2 items-center'><HiCalendarDays />{startDate}</span>
              <span>{daysSince}</span>
            </div>
          </SectionContainer>

          <SectionContainer>
            <Label variant='sectionlabel'>pattern</Label>
            <div className='grid grid-cols-6 grid-rows-3'>
              <p>size</p>
              <p>{project.size}</p>
              <p className='row-start-2'>pattern</p>
              <p>{project.pattern}</p>
              <p className='row-start-3'><HiLink />{project.patternUrl}</p>
            </div>
          </SectionContainer>

          <SectionContainer>
            <Label variant='sectionlabel'>needles</Label>
            {
              projectDetails.needles.map((needle) =>
                <div key={needle.id} > {needle.size}</div>
              )
            }
          </SectionContainer>

          <section>
            <h3 className='text-lg font-semibold'>
              Gauge
            </h3>
            <p>{`${projectDetails.gauges} sts x ${projectDetails.gauges} rows = ${projectDetails.gaugeInch}, on ${projectDetails.needles} in broken rib stitch after blocking`}</p>
          </section>

          <DrawerDialogFooter>
            <Button type="button" variant='outline'>Close</Button>
            <Link className='flex justify-end' href={`/projects/${project.id}/edit`}>
              <Button type="button">Edit</Button>
            </Link>
          </DrawerDialogFooter>

        </div>
      </DrawerDialogContent >


    </DrawerDialog >
  )
}