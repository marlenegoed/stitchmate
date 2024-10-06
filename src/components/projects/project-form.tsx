"use client";

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form"
import {updateProject, type NewProject} from '@/database/queries/queries';
import Link from 'next/link';
import ProjectFormNeedleSelect from './project-form-needle-select';
import ProjectFormYarn from './project-form/project-form-yarn-select';
import ProjectFormTitleField from './project-form/project-form-title';
import ProjectFormColorRadio from './project-form/color-radio';
import ProjectFormGauge from './project-form-gauge';
import ProjectFormDescription from './project-form/project-form-description';
import {FormCardHeading, FormCard} from './project-form/form-card';
import {FaPray} from 'react-icons/fa';
import ProjectFormStatus from './project-form/project-form-status';
import PatternRadio from './project-form/pattern-radio';
import ProjectFormPattern from './project-form/project-form-pattern';
import SectionContainer from '../ui/section-container';
import Ball from '../ui/svg/ball';
import Basket from '../ui/svg/basket';


const formSchema = z.object({
  title: z.string({
    required_error: "please name your project (you can change the title later).",
  }).max(50, {message: "Your title is too long. Must be 50 or fewer characters."}),
  color: z.enum(['olivine', 'orchid', 'flax', 'jordy', 'tangerine'], {message: 'please choose a color.'}),
  needles: z.array(z.object({
    size: z.string().optional(),
    usedFor: z.string().optional(),
  })).optional(),
  gauge: z.array(z.object({
    stitches: z.number().optional(),
    rows: z.coerce.number().optional(),
    inch: z.string().optional(),
    needle: z.string().optional(),
    stitchPattern: z.string().optional(),
    blocked: z.boolean(),
    inRounds: z.boolean(),
  })).optional(),
  yarn: z.array(z.object({
    name: z.string().optional(),
    color: z.string().optional(),
    lot: z.coerce.number().optional(),
    yardage: z.coerce.number().optional(),
    grams: z.coerce.number().optional(),
    skeins: z.coerce.number().optional(),
    material: z.string().optional(),
  })).optional(),
  description: z.string().optional(),
  createdAt: z.date(),
  finishBy: z.date().optional(),
  startDate: z.date().optional(),
  status: z.enum(['wip', 'finished', 'paused', 'frogged', 'planned']).optional(),
  patternId: z.string(),
  pattern: z.string().optional(),
  patternUrl: z.string().optional(),
  size: z.string().optional(),
})

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
      blobId,
      userId,
      patternId: parseInt(values.patternId),
    }
    await updateProject(userId, projectId, validProject)
    console.log(validProject)
  }

  console.log(form.getValues('pattern'))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4" method="post">

        <SectionContainer 
        icon={<Basket className='w-12 h-12'/>} 
        title='Overview' 
        >
          <ProjectFormTitleField />
          <ProjectFormPattern />


        </SectionContainer>

        <SectionContainer 
          icon={<Basket className='fill-goldenrod-700 w-6 h-6'/>} 
          title='Pattern' 
         >
          <div></div>
        </SectionContainer>


        <SectionContainer 
             icon={<Ball className='fill-viridian-700 w-6 h-6'/>} 
             title='Appearance' 
             className='flex flex-col'
             >
          <ProjectFormColorRadio defaultValues={defaultValues} />
          <PatternRadio defaultValues={defaultValues} />
        </SectionContainer>

        <SectionContainer className='flex flex-col'>
          <FormCardHeading>Status</FormCardHeading>
          <ProjectFormStatus createdAt={defaultValues.createdAt} finishBy={defaultValues.finishBy} startDate={defaultValues.startDate} status={defaultValues.status} />
        </SectionContainer>
 
        <SectionContainer className='flex flex-col'>
          <FormCardHeading className='mb-6'>Needles</FormCardHeading>
          <ProjectFormNeedleSelect />
        </SectionContainer>
        <SectionContainer className='flex flex-col'>
          <FormCardHeading>Yarn</FormCardHeading>
          <ProjectFormYarn />
        </SectionContainer>

        <ProjectFormGauge className='col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 order-4 bg-white rounded-lg py-6 pb-8 px-8' />

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


