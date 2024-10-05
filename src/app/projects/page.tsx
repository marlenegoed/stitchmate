'use server'
import {Suspense} from 'react';
import {auth} from "@clerk/nextjs/server";
import {ProjectsHeader} from '../../components/projects/projects-header';
import {ProjectList} from '../../components/projects/project-list';
import Loading from '../loading';
import HydrateUserSettingsStore from '@/components/store/hydrate-user-settings-store';
import {getUserSettings} from '@/database/queries/queries';
import dynamic from 'next/dynamic';
import ProjectDialog from '@/components/projects/project-dialog';
import {motion} from 'framer-motion';


export default async function Page({searchParams}: {searchParams?: {title?: string, favorite?: string, page?: number}}) {
  const {userId} = auth().protect();
  const userSettings = await getUserSettings(userId)
  const title = searchParams?.title || ''
  const favorite = searchParams?.favorite === '1' ? true : false;
  const page = searchParams?.page || 0


  return (
    <>
      <HydrateUserSettingsStore storeSound={userSettings.sound} showGuide={userSettings.guide} />
      <ProjectsHeader userId={userId} />
      <Suspense fallback={<Loading />}>
        <ProjectList title={title} favorite={favorite} userId={userId} page={page} />
      </Suspense>
      <ProjectDialog userId={userId} className='bg-sienna-100 hover:bg-sienna-100/90 rounded-full absolute bottom-6 right-6 h-14 w-14'/>
    </>
  )
}