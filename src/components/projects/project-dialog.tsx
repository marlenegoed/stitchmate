'use client'

import {
  Alert,
} from "@/components/ui/alert";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
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
import Link from 'next/link';
import {useState} from 'react';
import generateBlobId from '@/lib/generate-blob-id';


const formSchema = z.object({
  title: z.string({
    required_error: 'Please enter a title. You can change your title later.'
  })
    .min(5, {message: 'your title is too short. Must be 5 or more characters long.'})
    .max(50, {message: 'your title is too long! Must be below 50 characters'}),
  // color: z.number().int().positive({message: 'must be at least 1'}).max(999),
})

export default function ProjectDialog({userId}: {userId: string}) {

  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: 'Project Title',
    }
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Alert className='border-none p-0 m-0 bg-inherit'>
          <Button type='button' size='icon' variant='ghost' className='text-sienna-400'>
            <HiOutlineSquaresPlus size={24} />
          </Button>
        </Alert>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-eggshell p-10">
        <DialogHeader className='mb-2 -mt-2 bg-eggshell'>
          <div className='flex flex-row justify-between items-center mr-10'>
            <DialogTitle className='mb-2 font-semibold text-xl'>New Project</DialogTitle>
            <div className='flex flex-row gap-4 items-center -mt-1'>
            </div>
          </div>
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

            {/* <div className='w-full justify-center -ml-3 flex flex-row items-center my-4 pb-2 opacity-40 hover:opacity-50 transition-opacity'>
              {/* <HiChevronRight size={20} className='text-slate-800' /> */}
            {/* <Link className='flex px-1 flex-row border-b-2 font-semibold text-slate-800  border-slate-700 w-fit' href={`/projects/${section.projectId}/edit`}>
                advanced settigs
              </Link> */}
            {/* </div> */}



            <DialogFooter>
              <div className='grid grid-cols-2 gap-4'>
                <p onClick={handleClick} className="cursor-pointer underline underline-offset-4 text-neutral-800 opacity-50 hover:opacity-60 transition-opacity font-semibold flex justify-self-start	self-center pl-1">More Settings
                  {/* <Button type="button" variant='ghost' className='px-12 w-full decoration-2'>Settings</Button> */}
                </p>
                <Button type="submit" className='px-12 w-full'>
                  <span className='flex flex-row items-center gap-2 justify-center'>
                    Quickstart
                    <HiChevronRight size={20} className='text-white' />
                  </span>
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

