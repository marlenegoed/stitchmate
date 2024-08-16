import {TbProgress} from "react-icons/tb";
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

import {updateSection, type Section} from '@/database/queries/queries'; import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useCounterStore} from '@/providers/counter-store-provider';
import {Tooltip} from '../ui/tooltip';
import {
  DrawerDialog,
  DrawerDialogClose,
  DrawerDialogContent,
  DrawerDialogFooter,
  DrawerDialogHeader,
  DrawerDialogTitle,
  DrawerDialogTrigger
} from '../ui/drawer-dialog';


const formSchema = z.object({
  title: z.string({
    required_error: 'your section needs a title!'
  })
    .min(1, {message: 'your title is too short. Must be 1 or more characters long.'})
    .max(50, {message: 'your title is too long! Must be below 50 characters'}),
  count: z.coerce.number().int().positive({message: 'must be at least 1'}).max(999),
  rows: z.coerce.number().int().nonnegative(),
})

export default function SectionDialog({userId, section}: {userId: string, section: Section}) {
  const {storeCount, storeTitle} = useCounterStore(state => state)

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
    await updateSection(userId, section.id, values.title, values.count, section.projectId, values.rows)
    setOpen(false)
  }

  return (
    <>
      <DrawerDialog open={open} setOpen={setOpen}>
        {/* <Tooltip title="Section settings"> */}
        <DrawerDialogTrigger>
          <Button type='button' size='icon' className='rounded-full'>
            <TbProgress size={20} className='white' />
          </Button>
        </DrawerDialogTrigger>
        {/* </Tooltip> */}
        <DrawerDialogContent className="bg-neutral-100">
          <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4">

            <DrawerDialogHeader className='-mt-4 flex flex-col gap-4 items-center'>
              <DrawerDialogTitle className='font-semibold text-xl'>Section Progress</DrawerDialogTitle>
              <p className='text-sm text-slate-800 -mt-2 col-span-2'>Track your progress by adding a final row count:</p>
            </DrawerDialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className='grid grid-cols-2 gap-6'>

                  <FormField
                    control={form.control}
                    name="count"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Current Count</FormLabel>
                        <FormControl>
                          <Input placeholder={section.count.toString()} type="number" {...field}
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
                        <FormLabel>Final Row</FormLabel>
                        <FormControl>
                          <Input placeholder={!section.numOfRows ? '--' : section.numOfRows.toString()} type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DrawerDialogFooter className='grid grid-cols-2 gap-4 border-t pt-6'>
                  <DrawerDialogClose asChild>
                    <Button type="button" className='col-span-1 px-12 w-full' variant='outline'>Cancel</Button>
                  </DrawerDialogClose>
                  <Button type="submit" className='col-span-1 px-12 w-full'>Save changes</Button>
                </DrawerDialogFooter>
              </form>
            </Form>
          </div>
        </DrawerDialogContent>
      </DrawerDialog>
    </>
  );
}

