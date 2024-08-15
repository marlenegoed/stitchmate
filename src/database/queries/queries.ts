'use server'

import {eq, and, gte, sql, asc, gt, ilike, desc, not, count, or} from 'drizzle-orm'
import {db} from '../db'
import {projects, sections, reminders, userSettings, needles, yarn, gauge} from '../schema'
import {notFound, redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import generateBlobId from '@/lib/generate-blob-id';

export type NewProject = typeof projects.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type Reminder = typeof reminders.$inferSelect;
export type NewReminder = typeof reminders.$inferInsert
export type Section = typeof sections.$inferSelect;
export type NewSection = typeof sections.$inferInsert
export type UserSettings = typeof userSettings.$inferSelect

// projects 

export async function createNewProject(userId: string, title: string, blobId: number) {
  const projectId = await db.transaction(async (tx) => {
    const result = await tx.insert(projects).values({title, blobId, userId}).returning({id: projects.id})
    const projectId = result[0].id
    await tx.insert(sections).values({title: 'Section 1', projectId, position: 0, active: true, blobId: generateBlobId()})
    return projectId
  })
  redirect(`/projects/${projectId}/edit`)
}

export async function quickStartProject(userId: string, title: string, blobId: number) {
  const sectionId = await db.transaction(async (tx) => {
    const projectId = await tx.insert(projects)
      .values({title, blobId, userId})
      .returning({id: projects.id})

    const result = await tx.insert(sections)
      .values({title: 'Section 1', projectId: projectId[0].id, position: 0, active: true, blobId: generateBlobId()})
      .returning({id: sections.id})
    return result[0].id
  })

  redirect(`/sections/${sectionId}`)
}

export async function updateProject(userId: string, id: number, project: NewProject, url?: string) {
  const result = await db.update(projects).set({...project}).where(and(eq(projects.id, id), eq(projects.userId, userId))).returning()
  if (result.length < 1) {return }

  // const section = await findActiveSection(userId, id)
  // if (!section.length) {notFound()}
  // redirect(`/sections/${section[0].sections.id}`)
  if (!url) redirect('/projects')
  redirect(url)
}

export async function toggleFavorite(userId: string, projectId: number) {
  await db.update(projects).set({favorite: sql`not favorite`}).where(and(eq(projects.id, projectId), eq(projects.userId, userId))).returning()
  revalidatePath('/projects')
}

export async function getAllProjects(userId: string, title?: string, favorite?: boolean, page: number = 0,) {
  return await db.query.projects.findMany({
    with: {
      sections: true
    },
    where: and(
      eq(projects.userId, userId),
      title ? ilike(projects.title, title.replaceAll('%', '\\%') + '%') : undefined,
      favorite ? eq(projects.favorite, favorite) : undefined,
    ),
    orderBy: [desc(projects.favorite), desc(projects.createdAt)],
    limit: 24,
    offset: (page * 24)
  })
}

export async function countProjects(userId: string, title?: string, favorite?: boolean) {
  const result = await db.select({count: count()}).from(projects)
    .where(and(
      eq(projects.userId, userId),
      title ? ilike(projects.title, title.replaceAll('%', '\\%') + '%') : undefined,
      favorite ? eq(projects.favorite, favorite) : undefined,
    ))
  return result[0].count
}

export async function findProject(userId: string, id: number) {
  const result = await db.select().from(projects)
    .innerJoin(sections, and(eq(sections.projectId, projects.id), eq(sections.active, true)))
    .where(and(eq(projects.id, id), eq(projects.userId, userId)))
    .limit(1)

  return result[0]
}

export async function deleteProject(userId: string, id: number) {
  await db.delete(projects).where(and(eq(projects.id, id), eq(projects.userId, userId)));
  redirect("/projects")
}


// sections

export async function createNewSection(userId: string, projectId: number, position: number, title: string) {
  const sectionId = await db.transaction(async (tx) => {

    const userProjects = await tx.select({userId: projects.userId}).from(projects).where(and(eq(projects.userId, userId), eq(projects.id, projectId)))
    if (userProjects.length < 1) return

    await tx.update(sections).set({active: false}).where(eq(sections.projectId, projectId))
    await tx.update(sections).set({position: sql`${sections.position} + 1`}).where(and(eq(sections.projectId, projectId), gte(sections.position, position)))

    const neighbouringSections = await tx.select({blobId: sections.blobId}).from(sections)
      .where(and(eq(sections.projectId, projectId), or(eq(sections.position, position + 1), eq(sections.position, position - 1))))
      .limit(2)
    const existingBlobIds = neighbouringSections.map(section => section.blobId)

    const newSection = await tx.insert(sections).values({projectId, position, title, active: true, blobId: generateBlobId(existingBlobIds)}).returning({id: sections.id})
    return newSection[0].id
  })
  if (sectionId) {
    redirect(`/sections/${sectionId}`)
  } else {
    notFound()
  }
}

export async function findActiveSection(userId: string, projectId: number) {
  return await db.select().from(sections).innerJoin(projects, eq(projects.id, sections.projectId)).where(and(eq(projects.userId, userId), eq(sections.projectId, projectId), eq(sections.active, true)))
}

export async function findSectionById(userId: string, sectionId: number) {
  const result = await db.select().from(sections)
    .innerJoin(projects, eq(projects.id, sections.projectId))
    .where(and(eq(projects.userId, userId), eq(sections.id, sectionId)))
    .limit(1)

  return result[0]
}

export async function findAllSections(userId: string, projectId: number) {

  const result = await db.select().from(projects)
    .leftJoin(sections, eq(sections.projectId, projects.id))
    .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
    .orderBy(asc(sections.position))

  if (result.length === 0) {
    notFound()
  } else if (result.length === 1 && !result[0].sections) {
    return await db.insert(sections).values({projectId, position: 0, title: 'Section 1', active: true, blobId: generateBlobId()}).returning()
  }
  return result.map(row => row.sections!)
}


export async function findSectionReminders(userId: string, sectionId: number) {
  const result = await db.select().from(reminders)
    .innerJoin(sections, eq(sections.id, reminders.sectionId))
    .innerJoin(projects, eq(sections.projectId, projects.id))
    .where(and(eq(projects.userId, userId), eq(reminders.sectionId, sectionId)))
    .orderBy(sql`coalesce("from", "start") asc`)

  return result.map(row => row.reminders)

}


export async function updateSectionTitle(userId: string, id: number, title: string) {

  const isUserSection = await findSectionById(userId, id)
  if (!isUserSection) notFound()

  await db.update(sections).set({title}).where(eq(sections.id, id))
}


export async function updateSection(userId: string, id: number, title: string, count: number, projectId: number, numOfRows?: number) {

  const isUserSection = await findSectionById(userId, id)
  if (!isUserSection) notFound()

  await db.update(sections).set({title, count, numOfRows}).where(eq(sections.id, id))
  redirect(`/sections/${id}`)
}


export async function updateCount(userId: string, sectionId: number, newCount: number) {

  const isUserSection = await findSectionById(userId, sectionId)
  if (!isUserSection) notFound()

  if (newCount <= 1) {newCount = 1}
  if (newCount >= 999) {newCount = 999}

  const updatedCount = await db.update(sections)
    .set({count: newCount})
    .where(eq(sections.id, sectionId))
    .returning({count: sections.count});
  return updatedCount
}


export async function changeActiveSection(userId: string, projectId: number, position: number) {

  const isUserProject = await findProject(userId, projectId)
  if (!isUserProject) notFound()

  await db.update(sections).set({active: false}).where(eq(sections.projectId, projectId))

  const nextActiveSection = await db.update(sections)
    .set({active: true})
    .where(and(
      eq(sections.projectId, projectId),
      eq(sections.position, position)
    )).returning()

  redirect(`/sections/${nextActiveSection[0].id}`)
}


export async function setActiveSection(userId: string, sectionId: number) {

  const isUserSection = await findSectionById(userId, sectionId)
  if (!isUserSection) notFound()

  await db.transaction(async (tx) => {
    const projectId = tx.select({projectId: sections.projectId}).from(sections).where(eq(sections.id, sectionId))
    await tx.update(sections).set({active: false}).where(eq(projectId, sections.projectId))
    await tx.update(sections).set({active: true}).where(eq(sections.id, sectionId))
  })
}

export async function deleteSection(userId: string, section: Section) {

  const hasSections = await findAllSections(userId, section.projectId)

  if (hasSections.length <= 1) {
    throw new Error('project must have at least one section')
  }

  await db.transaction(async (tx) => {
    await tx.delete(sections).where(eq(sections.id, section.id))

    if (section.position !== hasSections.length - 1) {
      await tx.update(sections).set({position: sql`${sections.position} -1`}).where(and(eq(sections.projectId, section.projectId), gte(sections.position, section.position)))
    }
  })

  if (section.position === 0) {
    const nextSectionId = hasSections[section.position].id
    redirect(`/sections/${nextSectionId}`)
  } else {
    const previousSectionId = hasSections[section.position - 1].id
    redirect(`/sections/${previousSectionId}`)
  }
}

export async function cloneSection(userId: string, section: Section) {

  const isUserSection = await findSectionById(userId, section.id)
  if (!isUserSection) notFound()

  const newSectionId = await db.transaction(async (tx) => {
    await tx.update(sections).set({active: false}).where(eq(sections.projectId, section.projectId))
    await tx.update(sections).set({position: sql`${sections.position} + 1`}).where(and(eq(sections.projectId, section.projectId), gt(sections.position, section.position)))

    const sectionReminders: NewReminder[] = await tx.query.reminders.findMany({
      where: (eq(reminders.sectionId, section.id))
    })

    const sectionClone = {
      title: section.title + ' copy',
      active: true,
      position: section.position + 1,
      count: section.count,
      projectId: section.projectId,
      numOfRows: section.numOfRows,
    }

    const neighbouringSections = await tx.select({blobId: sections.blobId}).from(sections)
      .where(and(eq(sections.projectId, sectionClone.projectId), or(eq(sections.position, sectionClone.position - 1), eq(sections.position, sectionClone.position + 1))))
      .limit(2)
    const existingBlobIds = neighbouringSections.map(section => section.blobId)

    const newSectionId = await tx.insert(sections).values({...sectionClone, blobId: generateBlobId(existingBlobIds)}).returning({id: sections.id})

    for (let reminder of sectionReminders) {
      delete reminder.id
    }
    for (let reminder of sectionReminders) {
      await tx.insert(reminders).values({...reminder, sectionId: newSectionId[0].id})
    }

    return newSectionId[0].id
  })
  redirect(`/sections/${newSectionId}`)
}


// reminder 

export async function updateReminder(userId: string, reminder: Reminder) {

  const isUser = findSectionById(userId, reminder.sectionId)
  if (!isUser) notFound()

  await db.update(reminders).set({...reminder}).where(eq(reminders.id, reminder.id))
  redirect(`/sections/${reminder.sectionId}`)
}


export async function createReminder(userId: string, reminder: NewReminder) {

  const isUser = findSectionById(userId, reminder.sectionId)
  if (!isUser) notFound()

  await db.insert(reminders).values({...reminder, sectionId: reminder.sectionId})

  redirect(`/sections/${reminder.sectionId}`)
}

export async function deleteReminder(userId: string, sectionId: number, reminderId: number) {

  const isUser = findSectionById(userId, sectionId)
  if (!isUser) notFound()

  return await db.delete(reminders).where(eq(reminders.id, reminderId))
}


// user_Settings

export async function getUserSettings(userId: string) {
  let settings = await db.query.userSettings.findFirst({
    where: eq(userSettings.userId, userId)
  })

  if (!settings) {
    const newSetting = await db.insert(userSettings).values({sound: true, userId}).returning()
    return newSetting[0]
  }
  return settings
}


export async function toggleSound(userId: string) {
  return await db.update(userSettings).set({sound: not(userSettings.sound)}).where(eq(userSettings.userId, userId))
}

export async function toggleGuide(userId: string) {
  return await db.update(userSettings).set({guide: false}).where(eq(userSettings.userId, userId))
}

// needles yarn & gauge

export async function findProjectNeedles(projectId: number) {
  return await db.query.needles.findMany({
    where: eq(needles.projectId, projectId)
  })
}

export async function findProjectYarns(projectId: number) {
  return await db.query.yarn.findMany({
    where: eq(yarn.projectId, projectId)
  })
}

export async function findProjectGauges(projectId: number) {
  return await db.query.gauge.findMany({
    where: eq(gauge.projectId, projectId)
  })
}