'use server'

import {Section} from '@/database/queries/projects';
import BackButton from './back-button';
import Title from './title';
import DeleteDialog from '../sections/delete-dialog';

interface PageTitleProps {
  pageTitle: string,
  urlPath: string,
  section?: Section,
  projectId?: number,
}

export default async function PageNav({pageTitle, urlPath, projectId, section}: PageTitleProps) {

  return (
    <div className='flex justify-between flex-row w-full p-8 pt-4 pb-6'>
      <BackButton urlPath={urlPath} className='ml-0 self-start flex' />
      <Title>{pageTitle}</Title>
      <DeleteDialog projectId={projectId} section={section} />

    </div>

  )


}