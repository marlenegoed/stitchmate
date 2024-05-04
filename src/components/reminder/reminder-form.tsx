'use client';

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, useFormContext} from "react-hook-form";

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
import {useStore} from '@/app/store';
import makeOrdinal from '@/lib/make-ordinal';
import {Checkbox} from '../ui/checkbox';

import {type Reminder} from '@/lib/reminder';

const typeSchemaEvery = z.object({
  type: z.literal("every"),
  interval: z.number().positive(),
  start: z.number().positive(),
  times: z.number().nonnegative(),
})

const typeSchemaForUntil = z.object({
  type: z.literal("for-rows"),
  from: z.number().positive(),
  until: z.number().positive(),
})

const formSchema = z.object({
  title: z.string().min(1).max(50),
  note: z.string().max(200).optional(),
  notification: z.boolean(),
  repeat: z.discriminatedUnion('type', [typeSchemaForUntil, typeSchemaEvery])
})


interface ReminderFormProps {
  handleFormSubmit: (reminder: Reminder) => void,
  reminder?: Reminder
}

export default function ReminderForm({handleFormSubmit, reminder}: ReminderFormProps) {

  const {count} = useStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: reminder ? reminder.title : 'remind me',
      note: reminder ? reminder.note : 'you can add a note to your reminder e.g. k1, k2tog, knit to 3 sts before end, ssk, k1.',
      notification: reminder ? reminder.notification : true,
      repeat: reminder ? {...reminder.repeat} : {
        type: 'for-rows',
        from: count,
        until: count,
      }
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    const reminderId = reminder ? reminder.id : 0

    const newReminder: Reminder = {
      id: reminderId,
      title: values.title,
      note: values.note || '',
      notification: values.notification ?? true,
      repeat: values.repeat
    }
    handleFormSubmit(newReminder);
  }

  // toggle form input 
  let inputType;

  if (form.getValues().repeat.type === 'every') {
    inputType = <RepeatEveryInputs />;
  } else {
    inputType =
      <ForRowsInputs />;
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Buzzword</FormLabel>
              <FormControl>
                <Input placeholder='#do this' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repeat.type"
          render={({field}) => (
            <FormItem>
              <FormLabel>Repetition</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[100%]">
                    <SelectValue placeholder="select and configure repetition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="every">Repeat every</SelectItem>
                  <SelectItem value="for-rows">Repeat for rows</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {inputType}

        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Buzzword</FormLabel>
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
            <FormItem>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Enable notification</FormLabel>
                <FormDescription>By enabling notification you get prompted with a little tag and your buzzword</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">Save changes</Button>
      </form>
    </Form >
  );
}


function RepeatEveryInputs() {

  const {count} = useStore();
  const form = useFormContext()

  return (
    <div className="flex gap-x-5 w-full">

      <FormField
        control={form.control}
        name="repeat.start"
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
        name="repeat.interval"
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
        name="repeat.times"
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


function ForRowsInputs() {

  const {count} = useStore();
  const form = useFormContext()

  return (
    <div className="flex gap-x-5 w-full">

      <FormField
        control={form.control}
        name="repeat.from"
        render={({field}) => (
          <FormItem>
            <FormLabel>From</FormLabel>
            <FormControl>
              <Input type="number" placeholder={count.toString()} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="repeat.until"
        render={({field}) => (
          <FormItem>
            <FormLabel>Until</FormLabel>
            <FormControl>
              <Input type="number" placeholder={(count + 1).toString()} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

