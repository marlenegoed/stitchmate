"use client";

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useState, useEffect} from 'react';

import {Input} from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import {findSectionById, updateSectionTitle} from '@/database/queries/projects';
import {Button} from '../ui/button';



const formSchmema = z.object({
  title: z.string().min(1).max(50),
  count: z.coerce.number().int().positive().max(999),
  rows: z.coerce.number().nonnegative().optional(),
})

interface SectionTitleFieldProps {
  id: number,
  title: string
}

export default function SectionTitleField({id, title}: SectionTitleFieldProps) {

  const [currentTitle, setCurrentTitle] = useState(title)
  
  useEffect( () => {
  findSectionById(id).then(res => {
    if (!res) return
    setCurrentTitle(res.title)
   } )
  }, [id])


  const form = useForm<z.infer<typeof formSchmema>>({
    resolver: zodResolver(formSchmema),
    defaultValues: {
      title: currentTitle
    }
  })

  async function onSubmit(values: z.infer<typeof formSchmema>) {
    // setStoreTitle(values.title)
    await updateSectionTitle(id, values.title)
    setCurrentTitle(values.title)
  }

  return (
    <Form {...form}>
      {/* <p>{title}</p> */}
      <form className="space-y-6" onChange={() => onSubmit(form.getValues())} >
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder='currentTitle' variant='inline' className='placeholder:text-slate-800 font-semibold text-xl' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )

}