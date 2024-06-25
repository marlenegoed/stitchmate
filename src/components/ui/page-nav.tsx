'use server'

import {Section} from '@/database/queries/queries';
import BackButton from './back-button';
import Title from './title';
import DeleteDialog from '../sections/delete-dialog';

interface PageTitleProps {
  pageTitle: string,
  urlPath: string,
  section?: Section,
  projectId?: number,
}

export default async function PageNav({pageTitle, projectId, section}: PageTitleProps) {

  return (
    <div className='flex justify-between flex-row w-full pt-4 pb-6'>
      <Title>{pageTitle}</Title>
      <DeleteDialog projectId={projectId} section={section} />
    </div>
  )
}