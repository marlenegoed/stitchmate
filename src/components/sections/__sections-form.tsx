"use client";

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useState, useEffect} from 'react';

import {cn} from '@/lib/utils';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// import {useStore} from '@/app/store';
import {FaGears} from "react-icons/fa6";
import Title from '../ui/title';
import ResetAlertDialog from './reset-dialog';
import {Project} from '@/lib/project';


const formSchmema = z.object({
  title: z.string().min(1).max(50),
  count: z.coerce.number().int().positive().max(999),
  rows: z.coerce.number().nonnegative().optional(),
})

// SHEET_SIDES = ["top", "right", "bottom", "left"];
const side = "right";

interface ProjectSettingsProps {
  className: string,
  project: Project,
}

export default function ProjectSettings({className, project}: ProjectSettingsProps) {

  const [open, setOpen] = useState(false)

  return (
    <div className={cn("flex items-center justify-center", className)} >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <FaGears size={20} className='fill-slate-700' />
          </Button>
        </SheetTrigger>
        <SheetContent side={side}>
          <Title className='pb-4'>Edit Counter</Title>
          <ProjectSettingsForm setOpen={setOpen} project={project} />
          <ResetAll setOpen={setOpen} />
        </SheetContent>
      </Sheet>
    </div >
  );
}

interface ProjectSettingsFormProps {
  setOpen: (value: boolean) => void,
  project: Project
}

function ProjectSettingsForm({setOpen, project}: ProjectSettingsFormProps) {

  // const {title, count, numOfRows} = project
  // const {setTitle, setCount, setNumOfRows} = useStore();

  const form = useForm<z.infer<typeof formSchmema>>({
    resolver: zodResolver(formSchmema),
    defaultValues: {
      title: title,
      count: count,
      rows: numOfRows,
    }
  })

  // sync with store 
  useEffect(() => {
    form.setValue('rows', numOfRows);
  }, [numOfRows, form]);

  useEffect(() => {
    form.setValue('count', count);
  }, [count, form]);


  function onSubmit(values: z.infer<typeof formSchmema>) {
    setTitle(project.id, values.title);
    setCount(project.id, values.count || 1);
    setNumOfRows(project.id, values.rows || 0);
    setOpen(false);
  }

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder={title} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="count"
          render={({field}) => (
            <FormItem>
              <FormLabel>Count</FormLabel>
              <FormControl>
                <Input placeholder={count.toString()} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rows"
          render={({field}) => (
            <FormItem>
              <FormLabel>Final Row (optional)</FormLabel>
              <FormControl>
                <Input placeholder={numOfRows.toString()} type="number" {...field} />
              </FormControl>
              <FormDescription>
                Track your progress by adding your final row count.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex w-full mt-2'>
          <Button type="submit" className='px-12 w-full'>Save changes</Button>
        </div>

      </form>
    </Form>
  )
}

function ResetAll({setOpen}: {setOpen: (value: boolean) => void}) {

  return (
    <div className='flex w-full flex-col items-center py-20 gap-y-4'>
      <p className='text-center font-semibold text-neutral-500'>Ready to cast-on?<br /><span className='text-center font-normal text-neutral-500'>you can reset your count</span></p>
      <ResetAlertDialog setOpen={setOpen} />
    </div>
  )
}
