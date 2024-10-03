'use client';

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, useFormContext} from "react-hook-form";
import {Dispatch, SetStateAction} from 'react';

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
import {RadioGroup, RadioGroupItem} from '../ui/radio-group';
import DeleteDialog from '../sections/delete-dialog';


import {type Reminder} from '@/database/queries/queries';
import shortenText from '@/lib/shorten-text';
import {Label} from '../ui/label';
import SectionContainer from '../ui/section-container';
import SnoozeReminder from './reminder-snooze-btn';
import {reminderRelations} from '@/database/schema';

const formSchema = z.object({
  title: z.string().min(1).max(50),
  note: z.string().max(1000).optional(),
  notification: z.boolean(),
  type: z.enum(['range', 'repeating', 'single']),
  interval: z.coerce.number().positive().optional(),
  start: z.coerce.number().positive().optional(),
  times: z.coerce.number().nonnegative().optional(),
  from: z.coerce.number().positive().optional(),
  until: z.coerce.number().positive().optional(),
  row: z.coerce.number().positive().optional(),
})

export type FormValues = z.infer<typeof formSchema>

interface ReminderFormProps {
  reminder: Reminder,
  count: number,
  onSubmit: ((data: FormValues, reminder: Reminder) => Promise<void>) | ((data: FormValues, reminder: Reminder) => void),
  handleDelete?: () => void,
  handleSnooze: () => void,
  snoozed: boolean,
  setSnoozed: Dispatch<SetStateAction<boolean>>,
}

export default function ReminderForm({reminder, count, onSubmit, handleDelete, snoozed, setSnoozed, handleSnooze}: ReminderFormProps) {

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
      row: reminder && reminder.row ? reminder.row : 1,
    },
  })



  return (
    <div className="max-w-md w-full mx-auto flex flex-col overflow-auto h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => onSubmit(form.getValues(), reminder))} className="space-y-4 justify-center items-center flex flex-col">
          <ReminderTitleField />
          <ReminderFormInputs count={count} />
          <SectionContainer>
            <SnoozeReminder
              handleSnooze={handleSnooze}
              snoozed={snoozed}
              setSnoozed={setSnoozed}
              className='rounded-full self-center justify-self-center mt-auto'
            />
          </SectionContainer>
          <Button className='h-8 flex mt-auto border-sienna-300 text-sienna-300' type='submit' variant='outline'>save changes</Button>
        </form>
      </Form>
      {reminder && <div className='w-full flex justify-center mt-6 border-t py-2 mb-6'><DeleteDialog reminder={reminder} handleDelete={handleDelete} className='text-neutral-400' /></div>}
    </div>
  );
}


function ReminderFormInputs({count}: {count: number}) {

  const form = useFormContext()

  let inputType;
  if (form.getValues().type === 'repeating') {
    inputType = <RepeatEveryInputs count={count} />;
  } else if (form.getValues().type === 'range') {
    inputType = <ForRowsInputs />
  } else {
    inputType = <SingleRowInput />
  }

  return (
    <>
      <SectionContainer className='space-y-4'>
        <Label variant='sectionlabel'>repeat</Label>
        <FormField
          control={form.control}
          name="type"
          render={({field}) => (
            <FormItem className="w-full">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-row gap-4'
                >
                  <FormItem className='flex items-center space-x-1 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value="single" />
                    </FormControl>
                    <FormLabel className="text-base pb-1 text-neutral-900">
                      once:
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="range" />
                    </FormControl>
                    <FormLabel className="text-base pb-1  text-neutral-900">
                      on rows:
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="repeating" />
                    </FormControl>
                    <FormLabel className="text-base pb-1  text-neutral-900">
                      on intervalls:
                    </FormLabel>

                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />

            </FormItem>
          )}
        />
        <div className='grid grid-cols-3 gap-4 pb-2'>
          {inputType}
        </div>
      </SectionContainer>

      <SectionContainer>
        <Label variant='sectionlabel'>notes</Label>
        <FormField
          control={form.control}
          name="note"
          render={({field}) => (
            <FormItem>

              <FormControl>
                <Textarea
                  placeholder="add notes..."
                  className='border-none pl-0 font-medium'
                  rows={form.getValues().note ? 5 : 3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </SectionContainer>
    </>
  )
}


function ReminderTitleField() {

  const form = useFormContext()

  return (
    <SectionContainer>
      <Label variant='sectionlabel'>title</Label>
      <FormField
        control={form.control}
        name="title"
        render={({field}) => (
          <FormItem>
            <FormControl>
              <Input className='border-none pl-0 text-xl' placeholder='Enter Title' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* {showPencil && <HiOutlinePencil size={20} />} */}
    </SectionContainer>
  )
}

function RepeatEveryInputs({count}: {count: number}) {
  const form = useFormContext()

  return (
    <>
      <FormField
        control={form.control}
        name="start"
        render={({field}) => (
          <FormItem className='flex items-center justify-between w-full bg-neutral-100 space-y-0 px-2 rounded-lg'>
            <Label variant='sectionlabel' className='m-0'>start</Label>
            <FormControl>
              <Input className='p-0 text-right' size='sm' variant='background' type="number" min="1" placeholder={count.toString()} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="interval"
        render={({field}) => (
          <FormItem className='flex items-center justify-between w-full bg-neutral-100 space-y-0 px-2 rounded-lg'>
            <Label variant='sectionlabel' className='m-0'>every</Label>
            <FormControl>
              <Input className='p-0 text-right' size='sm' variant='background' type="number" placeholder="1" min="1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="times"
        render={({field}) => (
          <FormItem className='flex items-center justify-between w-full bg-neutral-100 space-y-0 px-2 rounded-lg'>
            <Label className='m-0' variant='sectionlabel'>times</Label>
            <FormControl>
              <Input className='p-0 text-right' size='sm' variant='background' type="number" placeholder="0" min="0" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}


function ForRowsInputs() {
  const form = useFormContext()

  return (
    <>
      <FormField
        control={form.control}
        name="from"
        render={({field}) => (
          <FormItem className='flex items-center justify-between w-full bg-neutral-100 space-y-0 px-2 rounded-lg'>
            <Label variant='sectionlabel' className='m-0'>from</Label>
            <FormControl>
              <Input className='p-0 text-right' size='sm' variant='background' type="number" min="1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="until"
        render={({field}) => (
          <FormItem className='flex items-center justify-between w-full bg-neutral-100 space-y-0 px-2 rounded-lg'>
            <Label variant='sectionlabel' className='m-0'>until</Label>
            <FormControl>
              <Input className='p-0 text-right' size='sm' variant='background' type="number" min="1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

function SingleRowInput() {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name="row"
      render={({field}) => (
        <FormItem className='flex items-center justify-between w-full bg-neutral-100 space-y-0 px-2 rounded-lg'>
          <Label variant='sectionlabel' className='m-0'>row</Label>
          <FormControl>
            <Input className='p-0 text-right' size='sm' variant='background' type="number" min="1" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
