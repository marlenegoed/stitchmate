"use client";

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form"
import {updateProject, type NewProject} from '@/database/queries/queries';
import Link from 'next/link';
import ProjectFormNeedleSelect from './project-form-needle-select';
import ProjectFormYarnSelect from './project-form-yarn-select';
import ProjectFormTitleField from './project-form/project-form-title';
import ProjectFormColorRadio from './project-form-color-radio';
import ProjectFormGauge from './project-form-gauge';
import ProjectFormDescription from './project-form/project-form-description';
import {FormCardHeading, FormCard} from './project-form/form-card';
import {FaPray} from 'react-icons/fa';
import ProjectFormStatus from './project-form/project-form-status';

const formSchema = z.object({
  title: z.string({
    required_error: "please name your project (you can change the title later).",
  }).max(50, {message: "Your title is too long. Must be 50 or fewer characters."}),
  color: z.enum(['olivine', 'orchid', 'flax', 'jordy', 'tangerine'], {message: 'please choose a color.'}),
  needles: z.array(z.object({
    size: z.string().optional(),
    usedFor: z.string().optional(),
  })).optional(),
  gaugeStitches: z.coerce.number().optional(),
  gaugeRows: z.coerce.number().optional(),
  gaugeInch: z.enum(['1"', '2"', '4"']).optional(),
  yarn: z.array(z.object({yarn: z.string().optional()})).optional(),
  description: z.string().optional(),
  createdAt: z.date(),
  finishBy: z.date().optional(),
  status: z.enum(['wip', 'finished', 'paused', 'frogged']).optional(),
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
      needles: values?.needles?.filter(needle => needle.size)?.map(needle => needle.size!),
      yarn: values?.yarn?.filter(item => item.yarn)?.map(item => item.yarn!),
      blobId,
      userId
    }
    await updateProject(userId, projectId, validProject)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-12 gap-4" method="post">
        <FormCard className='col-span-12'>
          <FormCardHeading>Project Info</FormCardHeading>
          <ProjectFormTitleField />
          <ProjectFormDescription />
        </FormCard>
        <FormCard className='col-span-12'>
          <FormCardHeading>Status</FormCardHeading>
          <ProjectFormStatus createdAt={defaultValues.createdAt} finishBy={defaultValues.finishBy} status={defaultValues.status} />
          {/* <ProjectFormDate createdAt={defaultValues.createdAt} /> */}
        </FormCard>
        <FormCard className='col-span-12'>
          <FormCardHeading>Appearance</FormCardHeading>
          <ProjectFormColorRadio defaultValues={defaultValues} />

        </FormCard>
        <div className='col-span-12 bg-white rounded pt-6 px-8 pb-10 gap-y-6'>
          <h3>Needles</h3>
          <ProjectFormNeedleSelect />
        </div>

        <ProjectFormGauge className='col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 order-4 bg-white rounded-lg py-6 pb-8 px-8' />
        <ProjectFormYarnSelect />

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


