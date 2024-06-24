import {Suspense} from 'react';
import {auth} from "@clerk/nextjs/server";
import {ProjectsHeader} from '../../components/projects/projects-header';
import {ProjectList} from '../../components/projects/project-list';

export default async function Page({searchParams}: {searchParams?: {title?: string, favorite?: string, page?: number}}) {
  const {userId} = auth().protect();

  const title = searchParams?.title || ''
  const favorite = searchParams?.favorite === '1' ? true : false;
  const page = searchParams?.page || 0


  return (
    <>
      <ProjectsHeader userId={userId} />
      <Suspense>
        <ProjectList title={title} favorite={favorite} userId={userId} page={page} />
      </Suspense>
    </>
  )
}