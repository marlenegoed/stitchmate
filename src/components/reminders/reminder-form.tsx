'use client';

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, useFormContext} from "react-hook-form";

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

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
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

import {Textarea} from "@/components/ui/textarea";
import makeOrdinal from '@/lib/make-ordinal';
import {type Reminder} from '@/database/queries/queries';
import AddReminder from './add-reminder';
import {useState} from 'react';
import {RadioGroup, RadioGroupItem} from '../ui/radio-group';
import DeleteDialog from '../sections/delete-dialog';
import {HiAdjustmentsVertical} from 'react-icons/hi2';
import {useMediaQuery} from '@/lib/use-media-query';
import {IoAdd} from 'react-icons/io5';
import {ScrollArea} from '../ui/scroll-area';


const formSchema = z.object({
  title: z.string().min(1).max(50),
  note: z.string().max(1000).optional(),
  notification: z.boolean(),
  type: z.enum(['range', 'repeating']),
  interval: z.coerce.number().positive().optional(),
  start: z.coerce.number().positive().optional(),
  times: z.coerce.number().nonnegative().optional(),
  from: z.coerce.number().positive().optional(),
  until: z.coerce.number().positive().optional(),
})

export type FormValues = z.infer<typeof formSchema>

interface ReminderFormProps {
  reminder?: Reminder
  count: number,
  sectionId: number,
  isIcon?: boolean,
  onSubmit: (values: FormValues) => Promise<void>,
  handleDelete?: () => void,
}

export default function ReminderForm({reminder, count, sectionId, isIcon, onSubmit, handleDelete}: ReminderFormProps) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  if (reminder && reminder.note === null) {
    reminder.note = ''
  }

  const defaultCount = count === 0 ? 1 : count;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: reminder ? reminder.title : '',
      note: reminder?.note || undefined,
      notification: reminder ? reminder.notification : true,
      type: reminder ? reminder.type : 'range',
      from: reminder && reminder.from ? reminder.from : defaultCount,
      until: reminder && reminder.until ? reminder.until : defaultCount,
      start: reminder && reminder.start ? reminder.start : defaultCount,
      interval: reminder && reminder.interval ? reminder.interval : 1,
      times: reminder && reminder.times ? reminder.times : 1,
    },
  })

  async function handleSubmit(values: FormValues) {
    await onSubmit(values)
    setOpen(false)
    form.reset()
  }


  if (isDesktop) {

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className='border-none p-0 m-0 bg-inherit'>
          {isIcon ? <HiAdjustmentsVertical size={20} className='text-slate-800 transition-colors cursor-pointer hover:text-sienna-400' /> : <AddReminder sectionId={sectionId} />}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-neutral-100 p-10">

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <DialogHeader className='mb-2 -mt-4 justify-between items-center'>
                <ReminderTitleField />
                {reminder && <DeleteDialog reminderId={reminder.id} handleDelete={handleDelete} />}
              </DialogHeader>
              <ReminderFormInputs count={count} />
              <DialogFooter className='grid grid-cols-2 gap-4 px-1'>
                <DialogClose asChild>
                  <Button type="button" className='px-12 w-full' variant='outline'>Cancel</Button>
                </DialogClose>
                <Button type="submit" className='px-12 w-full' disabled={form.formState.isSubmitting}>Save</Button>
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
        <button>
          {isIcon ? <HiAdjustmentsVertical size={20} className='text-slate-800 transition-colors cursor-pointer hover:text-sienna-400' /> : <AddReminder sectionId={sectionId} />}
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <ScrollArea className='overflow-auto p-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

              <DrawerHeader className="text-left">
                <DrawerTitle>
                  < ReminderTitleField />
                </DrawerTitle>
                {reminder && <DeleteDialog reminderId={reminder.id} handleDelete={handleDelete} />}
              </DrawerHeader>

              <ReminderFormInputs count={count} />

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


function ReminderFormInputs({count}: {count: number}) {
  const form = useFormContext()

  let inputType;
  if (form.getValues().type === 'repeating') {
    inputType = <RepeatEveryInputs count={count} />;
  } else {
    inputType = <ForRowsInputs />
  }

  return (
    <>
      <FormField
        control={form.control}
        name="type"
        render={({field}) => (
          <FormItem className="flex flex-col font-semibold space-y-3 w-full">
            <FormLabel className='text-base font-semibold pt-2'>Repeat</FormLabel>
            <FormControl>

              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className='pl-1'
              >
                <FormItem className='flex items-center space-x-2 space-y-0'>
                  <FormControl>
                    <RadioGroupItem value="range" />
                  </FormControl>
                  <FormLabel className="text-base pb-1">
                    ...on row(s)
                  </FormLabel>
                </FormItem>

                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="repeating" />
                  </FormControl>
                  <FormLabel className="text-base pb-1">
                    ...every
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {inputType}

      <div className='py-4'>
        <FormField
          control={form.control}
          name="note"
          render={({field}) => (
            <FormItem>
              <FormLabel className='font-semibold text-base'>Notes (optional)</FormLabel>
              <FormControl>
                <Textarea
                  className="boder-none rounded-lg p-3"
                  placeholder="add note"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}

function ReminderTitleField() {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name="title"
      render={({field}) => (
        <FormItem>
          <FormControl>
            <Input variant='noring' className='pl-0 bg-inherit border-none text-xl font-semibold' placeholder='Enter Title' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function RepeatEveryInputs({count}: {count: number}) {
  const form = useFormContext()

  return (
    <div className="grid grid-cols-3 gap-4">
      <FormField
        control={form.control}
        name="start"
        render={({field}) => (
          <FormItem>
            <FormLabel className='text-neutral-500'>start row</FormLabel>
            <FormControl>
              <Input className='border-none' type="number" min="1" placeholder={count.toString()} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="interval"
        render={({field}) => (
          <FormItem>
            <FormLabel className='text-neutral-500'>{`every ${makeOrdinal(field.value)}`}</FormLabel>
            <FormControl>
              <Input className='border-none' type="number" placeholder="1" min="1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="times"
        render={({field}) => (
          <FormItem>
            <FormLabel className='text-neutral-500'>times</FormLabel>
            <FormControl>
              <Input className='border-none' type="number" placeholder="0" min="0" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}


function ForRowsInputs() {
  const form = useFormContext()

  return (
    <div className="grid grid-cols-3 gap-4">
      <FormField
        control={form.control}
        name="from"
        render={({field}) => (
          <FormItem>
            <FormLabel className='text-neutral-500'>from</FormLabel>
            <FormControl>
              <Input className='border-none' type="number" min="1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="until"
        render={({field}) => (
          <FormItem>
            <FormLabel className='text-neutral-500'>until</FormLabel>
            <FormControl>
              <Input className='border-none' type="number" min="1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}