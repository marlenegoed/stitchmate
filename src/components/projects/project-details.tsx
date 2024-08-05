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
import {HiOutlineBookOpen} from "react-icons/hi2";
import {Project} from '@/database/queries/queries';
import moment from 'moment';
import {HiCalendarDays} from "react-icons/hi2";
import Link from 'next/link';
import {ScrollArea} from '../ui/scroll-area';



export default function ProjectDetails({project}: {project: Project}) {
  const [open, setOpen] = useState(false)
  const startDate = moment(project.createdAt).format('MMMM Do YYYY')
  const daysSince = moment(project.createdAt).startOf('day').fromNow()

  return (
    <DrawerDialog open={open} setOpen={setOpen}>

      <DrawerDialogTrigger>
        <Button
          type='button'
          size='icon'
          variant='ghost'
        >
          <HiOutlineBookOpen size={22} />
        </Button>
      </DrawerDialogTrigger>
      <DrawerDialogContent className="bg-neutral-100">
        <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4">

          <DrawerDialogHeader className='justify-between'>
            <DrawerDialogTitle>{project.title}</DrawerDialogTitle>
          </DrawerDialogHeader>

          <ScrollArea className='h-[350px]'>
            <section className='flex w-full justify-between'>
              <div className={`h-6 w-6 rounded-full bg-${project.color}`}></div>
              <div className='flex flex-col'>
                <span className='flex gap-2 items-center'><HiCalendarDays />{startDate}</span>
                <span>{daysSince}</span>
              </div>
            </section>

            <section>
              <h3 className='text-lg font-semibold'>
                Size
              </h3>
              <p>tbd</p>
            </section>

            <section>
              <h3 className='text-lg font-semibold'>
                Pattern or Template
              </h3>
              <p>tbd (add pattern link?)</p>

            </section>

            <section>
              <h3 className='text-lg font-semibold'>
                Description
              </h3>
              <p>{project.description}</p>
            </section>
            <section>
              <h3 className='text-lg font-semibold'>
                Description
              </h3>
              <p>{project.description}</p>
            </section>

            <section>
              <h3 className='text-lg font-semibold'>
                Description
              </h3>
              <p>{project.description}</p>
            </section>

            <section>
              <h3 className='text-lg font-semibold'>
                Description
              </h3>
              <p>{project.description}</p>
            </section>


            <section>
              <h3 className='text-lg font-semibold'>
                Needles
              </h3>
              <p>{project.needles}</p>
            </section>

            <section>
              <h3 className='text-lg font-semibold'>
                Gauge
              </h3>
              <p>{`${project.gaugeStitches} sts x ${project.gaugeRows} rows = ${project.gaugeInch}, on ${project.needles} in broken rib stitch after blocking`}</p>
            </section>

          </ScrollArea>
          <DrawerDialogFooter>
            <Button type="button" variant='outline'>Close</Button>
            <Link className='flex justify-end' href={`/projects/${project.id}/edit`}>
              <Button type="button">Edit</Button>
            </Link>
          </DrawerDialogFooter>

        </div>
      </DrawerDialogContent>


    </DrawerDialog>
  )
}