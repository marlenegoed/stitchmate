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
  DrawerDialogFooter
} from '../ui/drawer-dialog';
import {Button} from '../ui/button';
import {HiChevronRight, HiOutlineSquaresPlus} from 'react-icons/hi2';
import {useState} from 'react';


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
    <DrawerDialog open={open} setOpen={setOpen}>
      <DrawerDialogTrigger>
        <Button type='button' size='icon' variant='ghost' className={cn('text-sienna-400 hover:bg-neutral-200', className)}>
          <HiOutlineSquaresPlus size={22} />
        </Button>
      </DrawerDialogTrigger>

      <DrawerDialogContent>
        <DrawerDialogHeader title="Create new Project:" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input className='' placeholder='add Title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DrawerDialogFooter className='mt-10'>
              <Button type='button' variant='secondary' className='w-40 justify-self-center sm:justify-self-start' onClick={handleClick}>More Settings</Button>
              <Button type='submit' variant='outline' className='border-sienna-300 text-sienna-300 hover:text-sienna-400/80 hover:border-sienna-400/80 pl-8 pr-6 w-40 justify-self-center sm:justify-self-end sm:order-2 order-1'>
                <span className='flex flex-row items-center gap-2 justify-center'>
                  Quickstart
                  <HiChevronRight size={20} className='text-sienna-300' />
                </span>
              </Button>

            </DrawerDialogFooter>

          </form>
        </Form>

      </DrawerDialogContent>

    </DrawerDialog>
  );

}

