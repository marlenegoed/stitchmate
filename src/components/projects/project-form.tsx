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
  FormDescription,
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

import {updateProject, type NewProject} from '@/database/queries/projects';

import {FiPlus, FiX} from "react-icons/fi";
import Link from 'next/link';
import {RadioGroup, RadioGroupItem} from '../ui/radio-group';

const formSchema = z.object({
  title: z.string({
    required_error: "please name your project (you can change the title later).",
  }).max(50, {message: "Your title is too long. Must be 50 or fewer characters."}),
  color: z.enum(['champagne', 'olivine', 'orchid', 'flax', 'jordy', 'tangerine', 'caramel']),
  needles: z.array(z.object({size: z.string().optional()})).optional(),
  gaugeStitches: z.number().optional(),
  gaugeRows: z.number().optional(),
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
}

export default function ProjectForm({projectId, defaultValues}: ProjectFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  async function onSubmit(values: FormValues) {
    const validProject: NewProject = {
      ...values,
      needles: values?.needles?.filter(needle => needle.size)?.map(needle => needle.size!),
      yarn: values?.yarn?.filter(item => item.yarn)?.map(item => item.yarn!),
    }
    await updateProject(projectId, validProject)
  }

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full px-6" method="post">
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input variant='noring' placeholder={'my project'} {...field} className='pl-1 bg-inherit border-none text-xl font-semibold' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({field}) => (
            <FormItem className="space-y-3 pl-1">
              {/* <FormLabel>Notify me about...</FormLabel> */}
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row gap-6"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="champagne" className='bg-champagne' />
                    </FormControl>
                  </FormItem>

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

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="caramel" className='bg-caramel' />
                    </FormControl>
                  </FormItem>

                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



        <NeedleSelectField />


        <p>Gauge (optional)</p>
        <div className='grid grid-cols-3 gap-4'>
          <FormField
            control={form.control}
            name="gaugeStitches"
            render={({field}) => (
              <FormItem className=''>
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
                    <SelectTrigger>
                      <SelectValue placeholder="" />
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

        <YarnSelectField />

        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="add your project description"
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-4'>
          <Link href='/projects'>
            <Button type="button" variant="outline" className='w-full'>Cancel</Button>
          </Link>
          <Button type="submit" className='w-full'>Save Project</Button>
        </div>
      </form>
    </Form>
  )
}

function NeedleSelectField() {
  const form = useFormContext();
  const {fields, append, remove} = useFieldArray({control: form.control, name: "needles"})

  return (
    <div className="flex flex-col gap-y-4 bg-eggshell rounded-xl">
      <div className="flex items-center justify-between">
        <FormLabel>Needles (optional)</FormLabel>
        <Button type="button" variant="ghost" size="icon" onClick={() => append({size: ""})}><FiPlus /></Button>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select a needle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {needlesizes.map((needlesize) => <SelectItem key={needlesize} value={needlesize}>{needlesize}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="ghost" size="icon" disabled={fields.length < 2} onClick={() => remove(index)}><FiX /></Button>
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
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <FormLabel>Yarn (optional)</FormLabel>
        <Button type="button" variant="ghost" size="icon" onClick={() => append({size: ""})}><FiPlus /></Button>
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
                    <Input placeholder="add yarn" {...field} />
                  </FormControl>
                  <Button type="button" variant="ghost" size="icon" disabled={fields.length < 2} onClick={() => remove(index)}>
                    <FiX />
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