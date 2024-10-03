"use client";

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm, } from "react-hook-form";

import {Input} from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import shortenText from '@/lib/shorten-text';
import {useEffect, useMemo} from 'react';

const formSchema = z.object({
  title: z.string().min(1, {message: "Must be 1 or more characters long"}).max(50, {message: "Must be 50 or fewer characters long"}),
})

interface TitleInputProps {
  title: string
  handleSubmit: SubmitHandler<z.infer<typeof formSchema>>,
}

export default function TitleInput({title, handleSubmit}: TitleInputProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => ({title: shortenText(title, 10) || shortenText(title, 10)}), [title])
  })

  useEffect(() => {
    form.reset({title: shortenText(title, 10) || shortenText(title, 10)})
  }, [title])


  return (
    <Form {...form}>
      <form className="" onSubmit={form.handleSubmit(handleSubmit)} onBlur={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Add title'
                  variant='noborder'
                  className='placeholder:text-slate-800/50 font-semibold text-xl max-w-max pl-0'
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