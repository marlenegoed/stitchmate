'use client';

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, useFormContext} from "react-hook-form";
import {useParams} from 'next/navigation'

import {Button} from "@/components/ui/button";

import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {Textarea} from "@/components/ui/textarea";
import makeOrdinal from '@/lib/make-ordinal';
import {Checkbox} from '../ui/checkbox';
import {createReminder, updateReminder, type Reminder, type NewReminder} from '@/database/queries/projects';
import Link from 'next/link';
import {Value} from '@radix-ui/react-select';


// const typeSchemaEvery = z.object({
//   type: z.literal("repeating"),
//   interval: z.number().positive(),
//   start: z.number().positive(),
//   times: z.number().nonnegative(),
// })

// const typeSchemaForUntil = z.object({
//   type: z.literal("range"),
//   from: z.number().positive(),
//   until: z.number().positive(),
// })

// const formSchema = z.object({
//   title: z.string().min(1).max(50),
//   note: z.string().max(200).optional(),
//   notification: z.boolean(),
//   repeat: z.discriminatedUnion('type', [typeSchemaForUntil, typeSchemaEvery])
// })


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
  sectionId: number,
  projectId: number,
}

export default function ReminderForm({reminder, count, sectionId, projectId}: ReminderFormProps) {

  if (reminder && reminder.note === null) {
    reminder.note = ''
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: reminder ? reminder.title : 'remind me',
      note: reminder?.note || 'you can add a note to your reminder e.g. k1, k2tog, knit to 3 sts before end, ssk, k1.',
      notification: reminder ? reminder.notification : true,
      type: reminder ? reminder.type : 'range',
      from: count,
      until: count,
      start: count,
    },
  }
  )

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (reminder) {
      const updatedReminder: Reminder = {...reminder, ...values}
      await updateReminder(updatedReminder)
    } else {
      const newReminder: NewReminder = {...values, sectionId}
      await createReminder(newReminder)
    }

  }

  // toggle form input 
  let inputType;

  if (form.getValues().type === 'repeating') {
    inputType = <RepeatEveryInputs count={count} />;
  } else {
    inputType =
      <ForRowsInputs count={count} />;
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='#do this' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({field}) => (
            <FormItem>
              <FormLabel>Repetition</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-[100%]">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="repeating">Repeat every</SelectItem>
                  <SelectItem value="range">Repeat for rows</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {inputType}

        <FormField
          control={form.control}
          name="note"
          render={({field}) => (
            <FormItem>
              <FormLabel>Notes (optional)</FormLabel>
              <FormControl>
                <Textarea
                  className="boder-none rounded-lg p-3"
                  placeholder="you can add a note to your reminder e.g. k1, k2tog, knit to 3 sts before end, ssk, k1."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="notification"
          render={({field}) => (
            <FormItem className='flex flex-row gap-2'>
              <FormControl>
                <Checkbox
                  className='mt-3 rounded-sm'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div>
                <FormLabel>Enable notification</FormLabel>
                <FormDescription>By enabling notification you get prompted with a little tag</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className='grid grid-cols-2 gap-4'>
          <Button type="submit">Save changes</Button>
          <Link href={`/projects/${projectId}`} className='grid'>
            <Button variant='outline' type="button">Cancel</Button>
          </Link>
        </div>
      </form>
    </Form >
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
            <FormLabel>Start on Row</FormLabel>
            <FormControl>
              <Input type="number" placeholder={count.toString()} {...field} />
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
            <FormLabel>{`Repeat Every ${makeOrdinal(field.value)}`}</FormLabel>
            <FormControl>
              <Input type="number" placeholder="0" {...field} />
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
            <FormLabel>Times</FormLabel>

            <FormControl>
              <Input type="number" placeholder="0" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    </div>
  );
}


function ForRowsInputs({count}: {count: number}) {

  const form = useFormContext()

  return (
    <div className="grid grid-cols-2 gap-4">

      <FormField
        control={form.control}
        name="from"
        render={({field}) => (
          <FormItem>
            <FormLabel>From</FormLabel>
            <FormControl>
              <Input type="number"  {...field} />
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
            <FormLabel>Until</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={(e) => {
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

