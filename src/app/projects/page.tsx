'use server'
import {Suspense} from 'react';
import {auth} from "@clerk/nextjs/server";
import {ProjectsHeader} from '../../components/projects/projects-header';
import {ProjectList} from '../../components/projects/project-list';
import Loading from '../loading';
import HydrateUserSettingsStore from '@/components/store/hydrate-user-settings-store';
import {getUserSettings} from '@/database/queries/queries';
import dynamic from 'next/dynamic';


export default async function Page({searchParams}: {searchParams?: {title?: string, favorite?: string, page?: number}}) {
  const {userId} = auth().protect();
  const userSettings = await getUserSettings(userId)
  const title = searchParams?.title || ''
  const favorite = searchParams?.favorite === '1' ? true : false;
  const page = searchParams?.page || 0

  const Guide = dynamic(() => import('@/components/ui/guide'), {ssr: false})

  return (
    <>
      <HydrateUserSettingsStore storeSound={userSettings.sound} showGuide={userSettings.guide} />
      <Guide />
      <ProjectsHeader userId={userId} />
      <Suspense fallback={<Loading />}>
        <ProjectList title={title} favorite={favorite} userId={userId} page={page} />
      </Suspense>
    </>
  )
}