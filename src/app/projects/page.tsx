
import {Suspense} from 'react';
import {auth} from "@clerk/nextjs/server";
import {ProjectsHeader} from '../../components/projects/projects-header';
import {ProjectList} from '../../components/projects/project-list';
import {useAuth} from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import Loading from '../loading';


export default async function Page({searchParams}: {searchParams?: {title?: string, favorite?: string, page?: number}}) {
  const {userId} = auth().protect();

  const title = searchParams?.title || ''
  const favorite = searchParams?.favorite === '1' ? true : false;
  const page = searchParams?.page || 0

  // const ProjectList = dynamic(() => import('../../components/projects/project-list'), {ssr: false, loading: () => <p className='h-full'>Loading...</p>})

  return (
    <>
      <ProjectsHeader userId={userId} />
      <Suspense fallback={<Loading />}>
        <ProjectList title={title} favorite={favorite} userId={userId} page={page} />
      </Suspense>
    </>
  )
}