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
  Alert,
} from "@/components/ui/alert";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

import {Textarea} from "@/components/ui/textarea";
import makeOrdinal from '@/lib/make-ordinal';
import {type Reminder, type NewReminder} from '@/database/queries/projects';
import {useState} from 'react';
import {RadioGroup, RadioGroupItem} from '../ui/radio-group';
import {TbZzz} from "react-icons/tb";
import clsx from 'clsx';
import DeleteDialog from '../sections/delete-dialog';
import {HiAdjustmentsVertical} from 'react-icons/hi2';
import {useDemoStore} from '@/providers/demo-store-provider';
import {IoAdd} from 'react-icons/io5';

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

interface ReminderFormProps {
  reminder?: Reminder
  count: number,
  isIcon?: boolean
}

export default function ReminderForm({reminder, isIcon}: ReminderFormProps) {

  const {storeCount, updateReminder, setReminder} = useDemoStore((state) => state)
  const [open, setOpen] = useState(false)
  const [isNotification, setIsNotification] = useState(true)


  if (reminder && reminder.note === null) {
    reminder.note = ''
  }

  const defaultCount = storeCount === 0 ? 1 : storeCount;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: reminder ? reminder.title : 'Reminder Title',
      note: reminder?.note || 'you can add a note to your reminder e.g. k1, k2tog, knit to 3 sts before end, ssk, k1.',
      notification: reminder ? reminder.notification : true,
      type: reminder ? reminder.type : 'range',
      from: reminder && reminder.from ? reminder.from : defaultCount,
      until: reminder && reminder.until ? reminder.until : defaultCount,
      start: reminder && reminder.start ? reminder.start : defaultCount,
      interval: reminder && reminder.interval ? reminder.interval : 1,
      times: reminder && reminder.times ? reminder.times : 1,
    },
  }
  )

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (reminder) {
      const updatedReminder: Reminder = {...reminder, ...values}
      updateReminder(updatedReminder)
      setOpen(false)
    } else {
      const newReminder: NewReminder = {...values, sectionId: 0}
      setReminder(newReminder)
      setOpen(false)
    }
  }

  // toggle form input 
  let inputType;
  if (form.getValues().type === 'repeating') {
    inputType = <RepeatEveryInputs count={storeCount} />;
  } else {
    inputType =
      <ForRowsInputs />;
  }

  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Alert className='border-none p-0 m-0 bg-inherit'>
          {isIcon ? <HiAdjustmentsVertical size={20} className='text-slate-800 transition-colors cursor-pointer hover:text-sienna-400' /> : <AddReminder />}
        </Alert>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-100 p-10">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader className='mb-2 -mt-4 flex flex-row justify-between w-full pr-6'>
              <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                  <FormItem>
                    {/* <FormLabel>Title</FormLabel> */}
                    <FormControl>
                      <Input variant='noring' className='pl-0 bg-inherit border-none text-xl font-semibold' placeholder='Enter Title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {reminder && <DeleteDialog reminderId={reminder.id} />}

              <Button className='hover:bg-neutral-100 hover:opacity-70 transform-opacity' size='icon' variant='ghost' type='button'
                onClick={() => {
                  form.setValue('notification', !isNotification)
                  setIsNotification(!isNotification)
                }}><TbZzz size={20} className={clsx({'text-neutral-500': !isNotification, 'text-sienna-400': isNotification})} /></Button>
            </DialogHeader>

            <FormField
              control={form.control}
              name="type"
              render={({field}) => (
                <div className='flex flex-row'>
                  <FormItem className="text-base font-semibold space-y-3 flex flex-row items-center justify-between w-full">
                    <FormLabel className='text-base font-semibold self-center pt-2'>Repeat...</FormLabel>
                    <FormControl>

                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-y-1 gap-12"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
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
                </div>
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
                        className="boder-none rounded-lg p-3 text-sm"
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

            <DialogFooter>
              <div className='grid grid-cols-2 gap-4'>
                <DialogClose asChild>
                  <Button type="button" className='px-12 w-full' variant='outline'>Cancel</Button>
                </DialogClose>
                <Button type="submit" className='px-12 w-full'>Save changes</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

  );

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
              <Input type="number" min="1" placeholder={count.toString()} {...field} />
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
              <Input type="number" placeholder="1" min="1" {...field} />
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
              <Input type="number" placeholder="0" min="0" {...field} />
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
              <Input type="number" min="1" {...field} />
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
              <Input type="number" min="1" {...field} onChange={(e) => {
                field.onChange(parseInt(e.target.value, 10));
              }} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}



function AddReminder() {
  // const blob = useMemo(() => <BackgroundBlob colorClass='rose-200' stroke={false} className='absolute bottom-3 right-3 fill-white w-24  h-24 opacity-50' />, []);

  return (
    <div className='hover:cursor-pointer hover:bg-viridian-300 transition-colors relative z-10 w-40 h-40 flex bg-viridian-200 rounded-xl py-3 px-4 pb-6 shadow-sm'>
      <h4 className='font-semibold text-slate-800'>add reminder</h4>
      <IoAdd className='text-slate-800 self-end' size={24} />
    </div>
  );
}

