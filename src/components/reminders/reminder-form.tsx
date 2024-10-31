'use client';

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitErrorHandler, useForm, useFormContext} from "react-hook-form";
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
import {type Reminder} from '@/database/queries/queries';
import {Label} from '../ui/label';
import SectionContainer from '../ui/section-container';
import {Switch} from '../ui/switch';
import {Dispatch, SetStateAction, useState} from 'react';


const formSchema = z.object({
  title: z.string().min(1, {message: 'Please enter a title.'}).max(50, {message: 'Your title is too long. Must be 50 or fewer characters.'}),
  note: z.optional(z.string().max(1000)),
  notification: z.boolean().default(true),
  type: z.enum(['range', 'repeating', 'single']),
  interval: z.optional(z.coerce.number()),
  start: z.optional(z.coerce.number()),
  times: z.optional(z.coerce.number()),
  from: z.optional(z.coerce.number()),
  until: z.optional(z.coerce.number()),
  row: z.optional(z.coerce.number()),
})

export type FormValues = z.infer<typeof formSchema>

interface ReminderFormProps {
  reminder?: Reminder,
  count: number,
  onSubmit: ((data: FormValues) => Promise<void>) | ((data: FormValues) => void),
  setOpen: Dispatch<SetStateAction<boolean>>,
}

export default function ReminderForm({reminder, count, onSubmit, setOpen}: ReminderFormProps) {

  const [reminderValidationMessages, setReminderValidationMessages] = useState([''])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: reminder ? reminder.title : '',
      note: reminder?.note ? reminder.note : '',
      notification: reminder ? reminder.notification : true,
      type: reminder ? reminder.type : 'single',
      from: reminder && reminder.from ? reminder.from : count,
      until: reminder && reminder.until ? reminder.until : count + 1,
      start: reminder && reminder.start ? reminder.start : count,
      interval: reminder && reminder.interval ? reminder.interval : 0,
      times: reminder && reminder.times ? reminder.times : 0,
      row: reminder && reminder.row ? reminder.row : count,
    },
  })

  { /* -------------------------------------------------------------------------
    * the following is used to controll which inputs are shown, based on the 
    * type of reminder that is selected from the radio group 
    * the input message is a short text displayed above the input fields
    * to explain the selection to the user 
    * -----------------------------------------------------------------------*/ }
  
  
    let inputType, inputMessage

  if (form.getValues().type === 'repeating') {
    inputType = <RepeatEveryInputs count={count} />;
    inputMessage = 'The reminder repeats frequently and for a given number of times, e.g. starting at row 12, repeat every 10th row for 7 times.'
  } else if (form.getValues().type === 'range') {
    inputType = <ForRowsInputs />
    inputMessage = 'The reminder repeats on every row of a given range, e.g. from row 12 to row 20 (inclusive). It works great for increase sections.'
  } else if (form.getValues().type === 'single') {
    inputType = <SingleRowInput />
    inputMessage = 'Repeat once: The reminder belongs to a single row. This type works well as a simple note or to save any mods you made to a row.'
  }


  function handleSubmit(values: FormValues) {

    const validationMessages: string[] = []
    const reminderInputFields = getFieldNamesforReminderType(form.getValues('type'))

    reminderInputFields.forEach(reminderField => {
        if (reminderField === 'until') {
          console.log(!validatePositiveNum(values.until) || validatePositiveNum(values.until) <= validatePositiveNum(values.from))
          if (!validatePositiveNum(values.until) || validatePositiveNum(values.until) <= validatePositiveNum(values.from)) {
            validationMessages.push(`until: Please enter a number greater than 'from'.`)
          }
        } else if (reminderField === 'interval') {     
            if (!validatePositiveNum(values.interval)) {
              validationMessages.push(`every: Please enter a number greater than 0`)
            }
        } else if (!validatePositiveNum(values[reminderField])) {
          validationMessages.push(`${reminderField}: Please enter a number greater than 0`)
        }
      })


    console.log('validationMessages', validationMessages.length, validationMessages)

    if (validationMessages.length) {
      setReminderValidationMessages(validationMessages)
      console.log(reminderValidationMessages)
      return  
    }

    console.log('form is valid', values)
    onSubmit(values)
    setOpen(false)
  }

  const handleInvalid: SubmitErrorHandler<FormValues> = errors => {
    console.log('errors', errors)
    console.log("called")
  }




  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit, handleInvalid)} className="space-y-4 justify-center items-center flex flex-col">

        { /* -------------------------------------------------------------------------
           * Title input field
           * -----------------------------------------------------------------------*/ }
        <SectionContainer>
          <Label className='text-base' variant='sectionlabel'>Title</Label>
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem className='space-y-2'>
                <FormControl>
                  <Input variant='background' className='px-2 rounded-lg text-left text-base' placeholder='add title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </SectionContainer>


        { /* -------------------------------------------------------------------------
           *  Reminder Type Inputs
           * -----------------------------------------------------------------------*/ }
        <SectionContainer>
          <div className='flex justify-between mb-2'>
            <Label className='text-base mb-0' variant='sectionlabel'>Repetition</Label>
            <Button type='button' size='icon' className='text-sienna-300 rounded-full bg-transparent hover:bg-transparent hover:text-sienna-300/60 h-6 w-6'>?</Button>
          </div>
          <FormMessage className='text-neutral-400 min-h-10 h-fit'>{inputMessage}</FormMessage>

          <div className='flex flex-row h-36 mt-4'>
            <FormField
              control={form.control}
              name="type"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <RadioGroup
                      defaultValue={field.value} 
                      onValueChange={field.onChange}
                      className='mt-1 flex flex-col gap-3'
                    >
                      <FormItem className='flex items-center space-x-1 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value="single" />
                        </FormControl>
                        <FormLabel className="text-base pb-1 text-neutral-900">
                          repeat once
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="range" />
                        </FormControl>
                        <FormLabel className="text-base pb-1  text-neutral-900">
                          repeat on rows
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="repeating" />
                        </FormControl>
                        <FormLabel className="text-base pb-1  text-neutral-900">
                          repeat on intervalls
                        </FormLabel>

                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex flex-col gap-3'>
              {inputType}
            </div>
          </div>

          { 
            reminderValidationMessages.map((message, index) =>
              <FormMessage key={index}>{message}</FormMessage>
            )
          } 
  

        </SectionContainer>


        { /* -------------------------------------------------------------------------
        *  Notes Textarea Input
        * -----------------------------------------------------------------------*/ }
        <SectionContainer>
          <Label variant='sectionlabel' className='text-base'>Notes</Label>
          <div className='h-fit bg-dotted-spacing-4 bg-dotted-gray-200'>
            <FormField
              control={form.control}
              name="note"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className='h-40 border-none text-base pl-1'
                      rows={form.getValues().note ? 5 : 3}
                      {...field}
                    />
                  </FormControl>

                </FormItem>
              )}
            />
          </div>
        </SectionContainer>

        <SectionContainer>
          <div className='flex justify-between'>
            <Label variant='sectionlabel' className='text-base'>Notification</Label>
            <FormField
              control={form.control}
              name="notification"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      defaultChecked={field.value}
                      onCheckedChange={field.onChange}
                      className='data-[state=checked]:bg-sienna-300 data-[state=unchecked]:bg-neutral-200' />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p className='text-sm mt-2 text-neutral-400'>when enabled a note gets displayed above your blob counter once you hit the reminder row.</p>

        </SectionContainer>

        <div className='flex justify-center w-full bg-neutral-100'>
          <Button className='flex flex-row border-sienna-300 text-sienna-300 cursor-pointer mt-4' type='submit' variant='outline'>save changes</Button>
        </div>
      </form>
    </Form>
  )
}




{ /* -------------------------------------------------------------------------
  * Inputs based on selected reminder types 
  * -----------------------------------------------------------------------*/ }

function RepeatEveryInputs({count}: {count: number}) {
  const form = useFormContext()

  return (
    <>
      <FormField
        control={form.control}
        name="start"
        render={({field}) => (<>
          <FormItem className='flex items-center justify-between w-full bg-neutral-100 space-y-0 px-2 rounded-lg'>
            <Label variant='sectionlabel' className='m-0'>start</Label>
            <FormControl>
              <Input className='p-0 text-right' size='sm' variant='background' type="number" min="1" placeholder={count.toString()} {...field} />
            </FormControl>
          </FormItem>
        </>)}
      />

      <FormField
        control={form.control}
        name="interval"
        render={({field}) => (
          <>
            <FormItem className='flex items-center justify-between w-full bg-neutral-100 space-y-0 px-2 rounded-lg'>
              <Label variant='sectionlabel' className='m-0'>every</Label>
              <FormControl>
                <Input className='p-0 text-right' size='sm' variant='background' type="number" placeholder="1" min="1" {...field} />
              </FormControl>
            </FormItem>
          </>
        )}
      />

      <FormField
        control={form.control}
        name="times"
        render={({field}) => (
          <>
            <FormItem className='flex items-center justify-between w-full bg-neutral-100 space-y-0 px-2 rounded-lg'>
              <Label className='m-0' variant='sectionlabel'>times</Label>
              <FormControl>
                <Input className='p-0 text-right' size='sm' variant='background' type="number" placeholder="0" min="0" {...field} />
              </FormControl>
            </FormItem>
          </>
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
          </FormItem>
        )}
      />
    </>
  );
}

function SingleRowInput() {

  const form = useFormContext()

  return (
    <div className='flex flex-col'>
      <FormField
        control={form.control}
        name="row"
        render={({field}) => (
          <FormItem className='flex items-center justify-between w-full bg-neutral-100 space-y-0 px-2 rounded-lg'>
            <Label variant='sectionlabel' className='m-0'>row</Label>
            <FormControl>
              <Input className='p-0 text-right' size='sm' variant='background' type="number" min="1" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}



{ /* -------------------------------------------------------------------------
  * Helper for custom form validation:  
  * Form validation needs to be extended, as only the inputs should to be 
  * validated for a selected reminder type
  * -----------------------------------------------------------------------*/ }

  type ReminderKeys = {
    "single": "row",
    "range": "from" | "until",
    "repeating": "start" | "interval" | "times"
  }

function getFieldNamesforReminderType(reminderType: keyof ReminderKeys) {

  const fieldNames: Array<ReminderKeys[keyof ReminderKeys]> = []

  if (reminderType === 'single') fieldNames.push('row')
  if (reminderType === 'range') fieldNames.push('from', 'until')
  if (reminderType === 'repeating') fieldNames.push('start', 'interval', 'times')

  return fieldNames

} 

function validatePositiveNum(value: FormValues[keyof FormValues]): boolean {

  if (typeof value === 'number' && value > 0) return true
   
  return false

}


