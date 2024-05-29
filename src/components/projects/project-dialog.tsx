'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {HiOutlineSquaresPlus} from "react-icons/hi2";

import {HiChevronRight} from "react-icons/hi";

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {createNewProject, quickStartProject} from '@/database/queries/projects';
import {useState} from 'react';
import generateBlobId from '@/lib/generate-blob-id';
import {cn} from '@/lib/utils';
import {useMediaQuery} from '@/lib/use-media-query';


const formSchema = z.object({
  title: z.string({
    required_error: 'Please enter a title. You can change your title later.'
  })
    .min(5, {message: 'your title is too short. Must be 5 or more characters long.'})
    .max(50, {message: 'your title is too long! Must be below 50 characters'}),
  // color: z.number().int().positive({message: 'must be at least 1'}).max(999),
})

export default function ProjectDialog({userId, className}: {userId: string, className?: string}) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

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

  if (isDesktop) {

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type='button' size='icon' variant='ghost' className={cn('text-sienna-400 hover:bg-neutral-200', className)}>
            <HiOutlineSquaresPlus size={22} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-10">
          <DialogHeader className='mb-2 -mt-2'>
            <DialogTitle className='mb-2 mr-auto font-semibold text-xl'>New Project</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input variant='form' placeholder='Project Title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <div className='grid grid-cols-2 gap-4'>
                  <p onClick={handleClick} className="sm:col-span-1 col-span-2 cursor-pointer underline underline-offset-4 text-slate-700 hover:text-slate-950 transition-colors font-semibold flex justify-self-center sm:justify-self-start	self-center pl-1 sm:order-1 order-2 sm:pt-0 pt-2">More Settings
                  </p>
                  <Button type='submit' variant='outline' className='border-sienna-300 text-sienna-300 hover:text-sienna-400/80 hover:border-sienna-400/80 pl-8 pr-6 w-fit sm:col-span-1 col-span-2 justify-self-center sm:justify-self-end sm:mt-0 mt-2 sm:order-2 order-1'>
                    <span className='flex flex-row items-center gap-2 justify-center'>
                      Quickstart
                      <HiChevronRight size={20} className='text-sienna-300' />
                    </span>
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog >
    );

  }

  return (

    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button type='button' size='icon' variant='ghost' className={cn('text-sienna-400 hover:bg-neutral-200', className)}>
          <HiOutlineSquaresPlus size={22} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>

        <DrawerHeader className="text-center my-6">
          <DrawerTitle>
            Create new Project:
          </DrawerTitle>
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input variant='form' placeholder='Add title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DrawerFooter className="pt-2">
              <div className='grid grid-cols-2 gap-4'>
                <p onClick={handleClick} className="sm:col-span-1 col-span-2 cursor-pointer underline underline-offset-4 text-neutral-400 hover:text-neutral-500 transition-colors font-semibold flex justify-self-center sm:justify-self-start	self-center pl-1 sm:order-1 order-2 sm:pt-0 pt-2">More Settings
                </p>
                <Button type='submit' variant='outline' className='border-sienna-300 text-sienna-300 hover:text-sienna-400/80 hover:border-sienna-400/80 pl-8 pr-6 w-full sm:col-span-1 col-span-2 justify-self-center sm:justify-self-end sm:mt-0 mt-2 sm:order-2 order-1'>
                  <span className='flex flex-row items-center gap-2 justify-center'>
                    Quickstart
                    <HiChevronRight size={20} className='text-sienna-300' />
                  </span>
                </Button>
              </div>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer >
  )
}

