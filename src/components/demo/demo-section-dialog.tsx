import {
  Alert,
} from "@/components/ui/alert";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {HiMiniAdjustmentsVertical} from "react-icons/hi2";


import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";

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
import {useEffect, useState} from 'react';
import {useDemoStore} from '@/providers/demo-store-provider';
import {useCounterStore} from '@/providers/counter-store-provider';


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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: storeTitle,
      count: storeCount,
      rows: numOfRows,
    }
  })

  useEffect(() => {
    form.setValue("count", storeCount)
  }, [storeCount, form])

  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values, e) => {
    e?.preventDefault()
    setStoreTitle(values.title)
    setStoreCount(values.count)
    setNumOfRows(values.rows)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="border-none p-0 m-0 bg-inherit">
        <HiMiniAdjustmentsVertical size={20} className='text-slate-700' />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-100 p-10">
        <DialogHeader className='mb-2 -mt-2 items-center'>
          <DialogTitle className='mb-2 font-semibold text-xl mr-auto'>Counter Settings</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input variant='form' placeholder='add title' {...field} />
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
                    <FormLabel>Final Row (optional) *</FormLabel>
                    <FormControl>
                      <Input variant='form' placeholder={!numOfRows ? '--' : numOfRows.toString()} type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className='text-sm text-slate-800 -mt-2 col-span-2'>* Track your progress by adding your final row count.</p>
            </div>
            <div className='w-full justify-center -ml-3 flex flex-row items-center my-4 pb-2 opacity-80 hover:opacity-90 transition-opacity'>
            </div>
            <DialogFooter>
              <div className='grid grid-cols-2 gap-4'>
                <Button type="submit" className='px-12 w-full'>Save changes</Button>
                <DialogClose asChild>
                  <Button type="button" className='px-12 w-full' variant='outline'>Cancel</Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

