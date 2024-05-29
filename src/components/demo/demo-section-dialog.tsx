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
import {SubmitHandler, useForm, useFormContext, useFormState} from "react-hook-form";

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
import {useEffect, useState} from 'react';
import {useDemoStore} from '@/providers/demo-store-provider';
import {useCounterStore} from '@/providers/counter-store-provider';
import {Tooltip} from '../ui/tooltip';
import {useMediaQuery} from '@/lib/use-media-query';
import {ScrollArea} from '../ui/scroll-area';


const formSchema = z.object({
  title: z.string({
    required_error: 'your section needs a title!'
  })
    .min(2, {message: 'your title is too short. Must be 2 or more characters long.'})
    .max(50, {message: 'your title is too long! Must be below 50 characters'}),
  count: z.coerce.number().int().positive({message: 'must be at least 1'}).max(999),
  rows: z.coerce.number().int().nonnegative(),

})

export default function DemoSectionDialog() {

  const {storeTitle, storeCount, setStoreTitle, setStoreCount} = useCounterStore(state => state)
  const {numOfRows, setNumOfRows} = useDemoStore(
    (state) => state,
  )
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: storeTitle,
      count: storeCount,
      rows: numOfRows,
    }
  })

  useEffect(() => {
    form.setValue("rows", numOfRows)
    form.resetField("rows", {defaultValue: numOfRows})
  }, [numOfRows, form])

  useEffect(() => {
    form.setValue("count", storeCount)
    form.resetField("count", {defaultValue: storeCount})
  }, [storeCount, form])

  useEffect(() => {
    form.setValue("title", storeTitle)
    form.resetField("title", {defaultValue: storeTitle})
  }, [storeTitle, form])


  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values, e) => {
    e?.preventDefault()
    setStoreTitle(values.title)
    setStoreCount(values.count)
    setNumOfRows(values.rows)
    setOpen(false)
    form.reset(values)
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
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <SectionSettingsForm storeCount={storeCount} numOfRows={numOfRows} />

              <DialogFooter>
                <div className='grid grid-cols-2 gap-4'>
                  <Button type="submit" className='col-span-2 sm:col-span-1 order-1 sm:order-2 px-12 w-full'>Save changes</Button>
                  <DialogClose asChild>
                    <Button type="button" className='col-span-2 sm:col-span-1 px-12 w-full sm:order-2 order-2' variant='outline'>Cancel</Button>
                  </DialogClose>
                </div>
              </DialogFooter>
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

          <DrawerHeader className="text-left mb-4">
            <DrawerTitle>
              Section Settings
            </DrawerTitle>
          </DrawerHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <SectionSettingsForm storeCount={storeCount} numOfRows={numOfRows} />

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


function SectionSettingsForm({storeCount, numOfRows}: {storeCount: number, numOfRows: number}) {

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
              <Input variant='form' placeholder='Add title' {...field} />
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
                <Input variant='form' placeholder={storeCount.toString()} type="number" {...field}
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
                <Input variant='form' placeholder={!numOfRows ? '--' : numOfRows.toString()} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className='text-sm text-slate-800 -mt-2 col-span-2'>* Optional: track your progress by adding your final row count.</p>
      </div>

    </>
  )

}

