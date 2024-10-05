'use client'

import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {Input} from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {createNewProject, quickStartProject} from '@/database/queries/queries';
import generateBlobId from '@/lib/generate-blob-id';
import {cn} from '@/lib/utils';
import {
  DrawerDialog,
  DrawerDialogContent,
  DrawerDialogHeader,
  DrawerDialogTrigger,
  DrawerDialogFooter,
  DrawerDialogTitle
} from '../ui/drawer-dialog';
import {Button} from '../ui/button';
import {HiChevronRight, HiOutlineSquaresPlus} from 'react-icons/hi2';
import {useState} from 'react';
import {Label} from '../ui/label';
import Image from 'next/image'
import knit18 from "@/../../public/knit18.png"


const formSchema = z.object({
  title: z.string({
    required_error: 'Please enter a title. You can change your title later.'
  })
    .min(5, {message: 'your title is too short. Must be 5 or more characters long.'})
    .max(50, {message: 'your title is too long! Must be below 50 characters'}),
})

export default function ProjectDialog({userId, className}: {userId: string, className?: string}) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await quickStartProject(userId, values.title, generateBlobId())
    setOpen(false)
  }

  async function handleClick() {
    form.trigger()
    const title = form.getValues('title')
    if (title === '') {
      return setOpen(true)
    }
    await createNewProject(userId, title, generateBlobId())
    setOpen(false)
  }

  return (
    <DrawerDialog open={open} setOpen={setOpen} direction='bottom'>
      <DrawerDialogTrigger>
        <Button type='button' size='icon' variant='ghost' className={cn('text-sienna-400', className)}>
          <HiOutlineSquaresPlus size={22} />
        </Button>
      </DrawerDialogTrigger>

      <DrawerDialogContent dialogClass='h-fit bg-white flex flex-col items-center' drawerClass='bg-white h-fit flex-col space-y-6'>
        <DrawerDialogHeader className='flex justify-center'>
          <DrawerDialogTitle className='text-center font-semibold text-xl mx-0 lg:mb-2' >Create a new Project</DrawerDialogTitle>
        </DrawerDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem className='flex flex-col mx-auto items-left space-y-0 lg:w-64 w-80'>
                  <div className='flex flex-row mx-auto items-center bg-neutral-100 px-2 rounded-lg w-full'>
                    <Label className='mb-0 whitespace-nowrap' variant='sectionlabel'>Title</Label>
                    <FormControl>
                      <Input className='px-2 text-left font-semibold' variant='background' {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

              <div className='flex justify-center w-full my-4 opacity-90'>
                <Image src={knit18} alt='' width={100} />
              </div>

            <p className='text-gray-500 text-center text-sm px-8 max-w-80'>You can start your project right away or first add some more details such as pattern, yarn, needles or gauge. <br /> (You can add details later at any time.)</p>
            
            <DrawerDialogFooter className='mt-10'>

              <Button type='button' variant='outline' className=' text-gray-900 justify-self-center sm:justify-self-start' onClick={handleClick}>add details</Button>

              <Button type='submit' variant='outline' className='border-sienna-300 text-sienna-300 hover:text-sienna-400/80 hover:border-sienna-400/80 justify-self-center sm:justify-self-end sm:order-2 order-1'>
                
                start
           
              </Button>

            </DrawerDialogFooter>

          </form>
        </Form>

      </DrawerDialogContent>

    </DrawerDialog>
  );

}

