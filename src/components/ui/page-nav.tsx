'use server'

import {Section} from '@/database/queries/queries';
import BackButton from './back-button';
import Title from './title';
import DeleteDialog from '../sections/delete-dialog';

interface PageTitleProps {
  userId: string, 
  pageTitle: string,
  urlPath: string,
  section?: Section,
  projectId?: number,
}

export default async function PageNav({userId, pageTitle, urlPath, projectId, section}: PageTitleProps) {

  return (
    <div className='flex justify-between items-center flex-row w-full p-8 pt-4 pb-6'>
      <BackButton urlPath={urlPath} className='ml-0 self-start flex' />
      <Title>{pageTitle}</Title>
      <DeleteDialog userId={userId} projectId={projectId} section={section} />
    </div>
  )
}