"use client";

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

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

import {updateSection, type Section} from '@/database/queries/queries';
import Link from 'next/link';
import {useCounterStore} from '@/providers/counter-store-provider';
import {useEffect} from 'react';


const formSchema = z.object({
  title: z.string().min(1).max(50),
  count: z.coerce.number().int().positive().max(999),
  rows: z.coerce.number().nonnegative(),

})

export default function SectionForm({section}: {section: Section}) {
  const {storeCount, storeTitle} = useCounterStore(state => state)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: section.title,
      count: section.count,
      rows: section.numOfRows || 0,
    }
  })

  useEffect(() => {
    form.setValue("count", storeCount)
    form.resetField("count", {defaultValue: storeCount})
  }, [storeCount, form])

  useEffect(() => {
    form.setValue("title", storeTitle)
    form.resetField("title", {defaultValue: storeTitle})
  }, [storeTitle, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateSection(section.id, values.title, values.count, section.projectId, values.rows)
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
                <Input placeholder={section.title} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="count"
          render={({field}) => (
            <FormItem>
              <FormLabel>Current Count</FormLabel>
              <FormControl>
                <Input placeholder={section.count.toString()} type="number" {...field} />
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
              <FormLabel>Final Row (optional)</FormLabel>
              <FormControl>
                <Input placeholder={!section.numOfRows ? '--' : section.numOfRows.toString()} type="number" {...field} />
              </FormControl>
              <FormDescription>
                Track your progress by adding your final row count.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-4 mt-2'>
          <Button type="submit" className='px-12 w-full' disabled={form.formState.isSubmitting}>Save changes</Button>
          <Link href={`/projects/${section.projectId}`}>
            <Button type="button" className='px-12 w-full' variant='outline'>Cancel</Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}

