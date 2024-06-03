"use client";

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useRef} from 'react';

import {Input} from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import {updateSectionTitle} from '@/database/queries/queries';
import {useCounterStore} from '@/providers/counter-store-provider';
import {cn} from '@/lib/utils';

const formSchema = z.object({
  title: z.string().min(1).max(50),
})

interface SectionTitleFieldProps {
  userId: string,
  id: number,
  title: string
  className?: string
}

export default function SectionTitleField({userId, id, title, className}: SectionTitleFieldProps) {
  const {storeTitle, setStoreTitle} = useCounterStore(state => state)

  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {title: storeTitle || title}
  })

  useEffect(() => {
    form.reset({title: storeTitle})
  }, [storeTitle, form])

  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values, e) => {
    e?.preventDefault()
    if (!form.formState.isDirty) return

    await updateSectionTitle(userId, id, values.title)
    setStoreTitle(values.title)

    form.reset(values)
    inputRef.current?.blur()
  }

  const handleInvalid: SubmitErrorHandler<z.infer<typeof formSchema>> = async (_values, e) => {
    e?.preventDefault()
    form.reset()
    inputRef.current?.blur()
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit, handleInvalid)} ref={formRef}>
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Add title'
                  variant='inline'
                  className={cn('placeholder:text-slate-800/50 font-semibold text-xl max-w-max', className)}
                  {...field}
                  onBlur={() => formRef.current?.requestSubmit()}
                  ref={inputRef}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <button className="hidden" type="submit" />
      </form>
    </Form>
  )
}