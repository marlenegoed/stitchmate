"use client";

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";

import {Input} from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {updateSectionTitle} from '@/database/queries/queries';
import {useCounterStore} from '@/providers/counter-store-provider';
import {cn} from '@/lib/utils';
import shortenText from '@/lib/shorten-text';

const formSchema = z.object({
  title: z.string().min(1, {message: "Must be 1 or more characters long"}).max(50, {message: "Must be 50 or fewer characters long"}),
})

interface SectionTitleFieldProps {
  userId: string,
  id: number,
  title: string
  className?: string
}

export default function SectionTitleField({userId, id, title, className}: SectionTitleFieldProps) {
  const {storeTitle, setStoreTitle} = useCounterStore(state => state)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {title: shortenText(storeTitle, 10) || shortenText(title, 10)}
  })

  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    await updateSectionTitle(userId, id, values.title)
    setStoreTitle(values.title)
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)} onBlur={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Add title'
                  variant='inline'
                  className={cn('placeholder:text-slate-800/50 font-semibold text-xl max-w-max pl-0', className)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}