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
import {Label} from '../ui/label';
import {HiCheck} from "react-icons/hi2";
import Image from 'next/image'
import knit12 from "@/../../public/knit12.png"
import {HiChevronLeft} from "react-icons/hi2";



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
      <DrawerDialog open={open} setOpen={setOpen} direction='top'>
        {/* <Tooltip title="Section settings"> */}
        <DrawerDialogTrigger>
          <Button type='button' size='icon' className='rounded-full'>
            <TbProgress size={20} className='white' />
          </Button>
        </DrawerDialogTrigger>
        {/* </Tooltip> */}
        <DrawerDialogContent dialogClass='bg-white h-fit p-6 pt-4 min-w-[480px]' drawerClass='bg-white h-dvh'>
          <div className="max-w-md w-full h-full flex flex-col overflow-auto p-4 space-y-6 lg:space-y-0 mb-10 lg:mb-0">
            <DrawerDialogHeader className='text-center flex flex-col items-center'>
              <DrawerDialogTitle
                className='font-semibold text-xl mx-0 lg:mb-2'
              >
                Section Progress
              </DrawerDialogTitle>
            </DrawerDialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 lg:space-y-0 flex flex-col items-center mx-10 h-full">
                <div className='flex flex-col items-center space-y-10 lg:space-y-6 mt-4'>
                  <FormField
                    control={form.control}
                    name="count"
                    render={({field}) => (
                      <FormItem className='flex w-full items-center bg-neutral-100 space-y-0 px-2 rounded-lg w-40'>
                        <Label className='mb-0 whitespace-nowrap' variant='sectionlabel'>Current Row</Label>
                        <FormControl>
                          <Input
                            className='p-0' size='sm' variant='background'
                            placeholder={section.count.toString()} type="number" {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='flex justify-center w-full my-4 opacity-90'>
                    <Image src={knit12} alt='' width={100} />
                  </div>



                  <p className='text-slate-800 text-center'>You can track your progress and add the intended number of rows for this section:</p>
                  <FormField
                    control={form.control}
                    name="rows"
                    render={({field}) => (
                      <FormItem className='flex w-full items-center bg-neutral-100 space-y-0 px-2 rounded-lg w-40'>
                        <Label className='mb-0 whitespace-nowrap' variant='sectionlabel'>Final Row</Label>
                        <FormControl>
                          <Input
                            className='p-0' size='sm' variant='background'
                            placeholder={!section.numOfRows ? '--' : section.numOfRows.toString()} type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DrawerDialogFooter className='flex w-full items-center grow justify-center h-full'>
                  <Button
                    className='h-fit flex border-sienna-300 text-sienna-300 items-center gap-2 flex-col mt-4'
                    type='submit'
                    variant='ghost'
                  > <div className='flex justify-center items-center border border-sienna-300 h-10 w-10 rounded-full'>
                      <HiCheck size={24} />
                    </div>
                    save
                  </Button>
                </DrawerDialogFooter>
              </form>
            </Form>
          </div>
        </DrawerDialogContent>
      </DrawerDialog>
    </>
  );
}

