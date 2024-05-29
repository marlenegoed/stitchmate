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

import {HiMiniAdjustmentsVertical} from "react-icons/hi2";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, useFormContext} from "react-hook-form";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {updateSection, type Section} from '@/database/queries/projects';
import Link from 'next/link';
import DeleteDialog from './delete-dialog';
import {useEffect, useState} from 'react';
import {useCounterStore} from '@/providers/counter-store-provider';
import {Tooltip} from '../ui/tooltip';
import {useMediaQuery} from '@/lib/use-media-query';
import {ScrollArea} from '../ui/scroll-area';


const formSchema = z.object({
  title: z.string({
    required_error: 'your section needs a title!'
  })
    .min(1, {message: 'your title is too short. Must be 1 or more characters long.'})
    .max(50, {message: 'your title is too long! Must be below 50 characters'}),
  count: z.coerce.number().int().positive({message: 'must be at least 1'}).max(999),
  rows: z.coerce.number().int().nonnegative(),
})

export default function SectionDialog({section, numOfSections}: {section: Section, numOfSections: number}) {
  const {storeCount, storeTitle} = useCounterStore(state => state)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: section.title,
      count: section.count,
      rows: section.numOfRows || 0,
    }
  })

  useEffect(() => {
    form.resetField("count", {defaultValue: storeCount})
  }, [storeCount, form])

  useEffect(() => {
    form.resetField("title", {defaultValue: storeTitle})
  }, [storeTitle, form])


  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateSection(section.id, values.title, values.count, section.projectId, values.rows)
    setOpen(false)
  }

  if (isDesktop) {

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <Tooltip title="Section settings">
          <DialogTrigger asChild>
            <Alert className='border-none p-0 m-0 bg-inherit'>
              <Button type='button' size='icon' variant='ghost' className='hover:bg-neutral-200 hover:bg-opacity-80 transition-colors'>
                <HiMiniAdjustmentsVertical size={20} className='text-slate-700 ' />
              </Button>
            </Alert>
          </DialogTrigger>
        </Tooltip>
        <DialogContent className="sm:max-w-[425px] bg-neutral-100 p-10">
          <DialogHeader className='items-center gap-2'>
            <DialogTitle className='font-semibold text-xl mr-auto'>Section Settings</DialogTitle>
            <DeleteDialog className="ml-auto gap-4" section={section} disabled={numOfSections < 2} />
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <SectionSettingsForm section={section} />
              <DialogFooter>
                <div className='grid grid-cols-2 gap-4'>
                  <Button type="submit" className='col-span-2 sm:col-span-1 order-1 sm:order-2 px-12 w-full'>Save changes</Button>
                  <DialogClose asChild>
                    <Button type="button" className='col-span-2 sm:col-span-1 px-12 w-full sm:order-2 order-2' variant='outline'>Cancel</Button>
                  </DialogClose>
                </div>
              </DialogFooter>

              <div className='w-full justify-center flex flex-row items-center '>
                <Link className='flex flex-row text-sm text-neutral-500 underline underline-offset-4 w-fit  hover:text-neutral-900 transition-colors' href={`/projects/${section.projectId}/edit`}>
                  Edit project
                </Link>
              </div>

            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  return (

    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button type='button' size='icon' variant='ghost' className='hover:bg-neutral-200 hover:bg-opacity-80 transition-colors'>
          <HiMiniAdjustmentsVertical size={20} className='text-slate-700 ' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <ScrollArea className='overflow-auto p-4'>

          <DrawerHeader className="text-left mb-4 flex flex-row items-center">
            <DrawerTitle>
              Section Settings
            </DrawerTitle>
            <DeleteDialog className="ml-auto gap-4" section={section} disabled={numOfSections < 2} />
          </DrawerHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <SectionSettingsForm section={section} />

              <DrawerFooter className="pt-2 gap-4">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
                <Button type="submit" className='px-12 w-full' disabled={form.formState.isSubmitting}>Save</Button>
              </DrawerFooter>
            </form>
          </Form>
        </ScrollArea>
      </DrawerContent>
    </Drawer >
  )


}



function SectionSettingsForm({section}: {section: Section}) {

  const form = useFormContext()

  return (

    <>
      <FormField
        control={form.control}
        name="title"
        render={({field}) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input variant='form' placeholder={section.title} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='grid grid-cols-2 gap-6'>
        <FormField
          control={form.control}
          name="count"
          render={({field}) => (
            <FormItem>
              <FormLabel>Current Count</FormLabel>
              <FormControl>
                <Input variant='form' placeholder={section.count.toString()} type="number" {...field}
                />
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
              <FormLabel>Final Row *</FormLabel>
              <FormControl>
                <Input variant='form' placeholder={!section.numOfRows ? '--' : section.numOfRows.toString()} type="number" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className='text-sm text-slate-800 -mt-2 col-span-2'>* Track your progress by adding your final row count.</p>
      </div>
    </>
  )

}