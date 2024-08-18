'use client';

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, useFormContext} from "react-hook-form";
import {useState} from 'react';

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
import {Textarea} from "@/components/ui/textarea";
import AddReminder from './add-reminder';
import {RadioGroup, RadioGroupItem} from '../ui/radio-group';
import DeleteDialog from '../sections/delete-dialog';
import {HiAdjustmentsVertical, HiOutlinePlus} from 'react-icons/hi2';
import clsx from 'clsx';


import makeOrdinal from '@/lib/make-ordinal';
import {type Reminder} from '@/database/queries/queries';
import {HiOutlinePencil} from "react-icons/hi2";
import shortenText from '@/lib/shorten-text';

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

// export type SubmitHandler = ((data: FormValues, reminder: Reminder,) => Promise<void>) | (( values: FormValues, reminder: Reminder) => void)

interface ReminderFormProps {
  reminder: Reminder,
  count: number,
  onSubmit: ((data: FormValues, reminder: Reminder) => Promise<void>) | ((data: FormValues, reminder: Reminder) => void),
  handleDelete?: () => void,
}

export default function ReminderForm({reminder, count, onSubmit, handleDelete}: ReminderFormProps) {

  if (reminder && reminder.note === null) {
    reminder.note = ''
  }

  const defaultTitle = reminder ? shortenText(reminder.title, 20) : ''
  const defaultCount = count === 0 ? 1 : count;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultTitle,
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



  return (
    <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => onSubmit(form.getValues(), reminder))} className="space-y-4">
          <ReminderTitleField />
          <ReminderFormInputs count={count} />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
      {reminder && <div className='w-full flex mt-6 border-t'><DeleteDialog reminder={reminder} handleDelete={handleDelete} className='justify-start' /></div>}
    </div>
  );
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
          <FormItem className="flex flex-row font-medium gap-4 w-full items-start">
            <FormLabel className='text-lg font-medium text-gray-900 pt-1'>Repetition:</FormLabel>
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
                  <FormLabel className="text-base pb-1 text-neutral-900">
                    ...on row(s)
                  </FormLabel>
                </FormItem>

                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="repeating" />
                  </FormControl>
                  <FormLabel className="text-base pb-1  text-neutral-900">
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
              <FormLabel className='font-medium text-lg text-gray-900'>Notes (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="add notes..."
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
  const value = form.watch('title')

  const [showPencil, setShowPencil] = useState(true)
  console.log(value.length)

  let inputWidth = value.length === 0 ? 130 + 10 + 'px' : value.length * 12 + 10 + 'px'
  return (
    <div className='flex items-center justify-start'>
      <FormField
        control={form.control}
        name="title"
        render={({field}) => (
          <FormItem>
            <FormControl>
              <Input style={{width: inputWidth}} className={`placeholder:text-neutral-400 bg-inherit text-2xl font-semibold border-none pl-0`} placeholder='Enter Title' {...field} onFocus={() => (setShowPencil(false))} onBlur={() => {setShowPencil(true)}} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {showPencil && <HiOutlinePencil size={20} />}
    </div>
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
            <FormLabel>start row</FormLabel>
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
            <FormLabel>{`every ${makeOrdinal(field.value)}`}</FormLabel>
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
            <FormLabel>times</FormLabel>
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
            <FormLabel>from</FormLabel>
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
            <FormLabel>until</FormLabel>
            <FormControl>
              <Input type="number" min="1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function AddNote() {
  return (
    <div className='border border-dashed rounded-lg border-neutral-400 flex justify-center flex-col items-center py-10 gap-2'>
      <div className="border border-dashed border-neutral-400 rounded-full w-12 h-12 flex items-center justify-center">
        <HiOutlinePlus className='text-neutral-400' size={20} />
      </div>
      <p className="text-left text-neutral-400/80 text-lg">add notes</p>
    </div>
  )
}