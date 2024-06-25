"use client";

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, useFormContext} from "react-hook-form";
import {useFieldArray} from 'react-hook-form';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Textarea} from '../ui/textarea';

import {updateProject, type NewProject} from '@/database/queries/queries';

import {HiOutlinePlus} from "react-icons/hi";
import {HiOutlineX} from "react-icons/hi";

import Link from 'next/link';
import {RadioGroup, RadioGroupItem} from '../ui/radio-group-colors';

const formSchema = z.object({
  title: z.string({
    required_error: "please name your project (you can change the title later).",
  }).max(50, {message: "Your title is too long. Must be 50 or fewer characters."}),
  color: z.enum(['olivine', 'orchid', 'flax', 'jordy', 'tangerine'], {message: 'please choose a color.'}),
  needles: z.array(z.object({size: z.string().optional()})).optional(),
  gaugeStitches: z.coerce.number().optional(),
  gaugeRows: z.coerce.number().optional(),
  gaugeInch: z.enum(['1"', '2"', '4"']).optional(),
  yarn: z.array(z.object({yarn: z.string().optional()})).optional(),
  description: z.string().optional()
})

const needlesizes = [
  'US 0 - 2.0 mm',
  'US 1  - 2.25 mm',
  'US 1.5 - 2.5 mm',
  'US 2  - 2.75 mm',
  'US 2.5 - 3.0 mm',
  'US 3  - 3.25 mm',
  'US 4  - 3.5 mm',
  'US 5  - 3.75 mm',
  'US 6  - 4.0 mm',
  'US 7  - 4.5 mm',
  'US 8  - 5.0 mm',
  'US 9  - 5.5 mm',
  'US 10  - 6.0 mm',
  'US 10.5 - 6.5 mm',
  'US 11  - 8.0 mm',
  'US 13  - 9.0 mm',
  'US 15  - 10.0 mm',
  'US 17  - 12.0 mm',
  'US 19  - 15.0 mm',
  'US 35  - 19.0 mm',
  'US 50  - 25.0 mm',
]

export type FormValues = z.infer<typeof formSchema>

interface ProjectFormProps {
  defaultValues: FormValues,
  projectId: number,
  blobId: number,
  userId: string
}

export default function ProjectForm({userId, projectId, defaultValues, blobId}: ProjectFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  async function onSubmit(values: FormValues) {
    const validProject: NewProject = {
      ...values,
      needles: values?.needles?.filter(needle => needle.size)?.map(needle => needle.size!),
      yarn: values?.yarn?.filter(item => item.yarn)?.map(item => item.yarn!),
      blobId,
      userId
    }
    await updateProject(userId, projectId, validProject)
  }

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full grid grid-cols-12 gap-4" method="post">
        <div className='grid col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 order-1 bg-white rounded-lg pt-6 px-8 pb-10 gap-y-6'>
          <p className='font-semibold mt-2'>Title</p>
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={'my project'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className='font-semibold mt-2 mb-4'>Color</p>
          <FormField
            control={form.control}
            name="color"
            render={({field}) => (
              <FormItem className="space-y-3 pl-1">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={defaultValues.color}
                    className="flex flex-row flex-wrap gap-6"
                  >

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="olivine" className='bg-olivine' />
                      </FormControl>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="orchid" className='bg-orchid' />
                      </FormControl>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="flax" className='bg-flax' />
                      </FormControl>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="jordy" className='bg-jordy' />
                      </FormControl>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="tangerine" className='bg-tangerine' />
                      </FormControl>
                    </FormItem>

                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        <NeedleSelectField />

        <div className='col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 order-4 bg-white rounded-lg py-6 pb-8 px-8'>
          <p className='font-semibold mt-2 mb-4'>Gauge (optional)</p>
          <div className='grid grid-cols-3 gap-4'>
            <FormField
              control={form.control}
              name="gaugeStitches"
              render={({field}) => (
                <FormItem >
                  <FormLabel>stitches</FormLabel>
                  <FormControl>
                    <Input placeholder={''} type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gaugeRows"
              render={({field}) => (
                <FormItem>
                  <FormLabel>rows</FormLabel>
                  <FormControl>
                    <Input placeholder={''} type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gaugeInch"
              render={({field}) => (
                <FormItem>
                  <FormLabel>inch</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='border'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='1"'>{`1"`}</SelectItem>
                      <SelectItem value='2"'>{`2"`}</SelectItem>
                      <SelectItem value='4"'>{`4"`}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>


        <div className='col-span-12 sm:col-span-6 order-2 bg-white rounded-lg px-8 pt-8 pb-10'>
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem>
                <div className='mb-6'>
                  <FormLabel className='font-semibold text-md'>Description (optional)</FormLabel>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="add description..."
                    className="resize-none border"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <YarnSelectField />


        <div className='col-span-12 mt-4 mb-6 order-last '>
          <div className='flex justify-center sm:justify-end gap-4 max-[638px]:grid max-[638px]:grid-cols-2'>
            <Link href='/projects'>
              <Button type="button" variant="outline" className='sm:w-40 max-[638px]:w-full'>Cancel</Button>
            </Link>
            <Button type="submit" className='sm:w-40' disabled={form.formState.isSubmitting}>Save Changes</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

function NeedleSelectField() {
  const form = useFormContext();
  const {fields, append, remove} = useFieldArray({control: form.control, name: "needles"})

  return (
    <div className="order-3 col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 flex flex-col bg-white rounded-lg p-8 pr-4 py-6">
      <div className="flex items-center justify-between mb-3">
        <FormLabel className='text-md font-semibold'>Needles (optional)</FormLabel>
        <Button type="button" variant="ghost" size="icon" onClick={() => append({size: ""})}><HiOutlinePlus className='text-sienna-400' /></Button>
      </div>
      {fields.map((field, index) => {
        return (
          <FormField
            key={field.id}
            name={`needles.${index}.size`}
            control={form.control}
            render={({field}) => (
              <FormItem>
                <div className="flex items-center">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='font-normal border mr-2 mb-4'>
                        <SelectValue placeholder="select needle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {needlesizes.map((needlesize) => <SelectItem key={needlesize} value={needlesize}>{needlesize}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="ghost" size="icon" className='mr-1 -mt-4 text-neutral-500 disabled:opacity-50 transform opacity hover:bg-white hover:text-slate-700' disabled={fields.length < 2} onClick={() => remove(index)}><HiOutlineX /></Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      })}
    </div>
  )
}


function YarnSelectField() {
  const form = useFormContext();
  const {fields, append, remove} = useFieldArray({control: form.control, name: "yarn"})

  return (
    <div className="order-5 col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 flex flex-col gap-y-4 bg-white rounded-lg pt-6 pb-10 pr-4 pl-8 ">
      <div className="flex items-center justify-between">
        <FormLabel className='font-semibold text-md'>Yarn (optional)</FormLabel>
        <Button type="button" variant="ghost" size="icon" onClick={() => append({size: ""})}><HiOutlinePlus className='text-sienna-400' /></Button>
      </div>
      {fields.map((field, index) => {
        return (
          <FormField
            key={field.id}
            name={`yarn.${index}.yarn`}
            control={form.control}
            render={({field}) => (
              <FormItem>
                <div className="flex items-center">
                  <FormControl>
                    <Input placeholder="add yarn" className='py-6 mr-2 font-normal' {...field} />
                  </FormControl>
                  <Button type="button" variant="ghost" size="icon" className=' hover:bg-white hover:text-slate-700 text-neutral-500 disabled:opacity-50 transform opacity' disabled={fields.length < 2} onClick={() => remove(index)}>
                    <HiOutlineX className='mr-2' />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      })}
    </div>
  )
}