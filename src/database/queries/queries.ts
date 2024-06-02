'use server'

import {eq, and, gte, sql, asc, gt, ilike, desc, not, count, or} from 'drizzle-orm'
import {db} from '../db'
import {projects, sections, reminders, userSettings} from '../schema'
import {redirect} from 'next/navigation';
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

export async function updateProject(userId: string, id: number, project: NewProject) {
  const result = await db.update(projects).set({...project}).where(and(eq(projects.id, id), eq(projects.userId, userId)))
  if (result.length < 1) return
  const section = await findActiveSection(id)
  if (!section) {throw new Error('no section found')}
  redirect(`/sections/${section.id}`)
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

// TODO: add userID
export async function createNewSection(projectId: number, position: number, title: string) {
  const sectionId = await db.transaction(async (tx) => {
    await tx.update(sections).set({active: false}).where(eq(sections.projectId, projectId))
    await tx.update(sections).set({position: sql`${sections.position} + 1`}).where(and(eq(sections.projectId, projectId), gte(sections.position, position)))

    const neighbouringSections = await tx.select({blobId: sections.blobId}).from(sections)
      .where(and(eq(sections.projectId, projectId), or(eq(sections.position, position + 1), eq(sections.position, position - 1))))
      .limit(2)
    const existingBlobIds = neighbouringSections.map(section => section.blobId)

    const newSection = await tx.insert(sections).values({projectId, position, title, active: true, blobId: generateBlobId(existingBlobIds)}).returning({id: sections.id})
    return newSection[0].id
  })
  redirect(`/sections/${sectionId}`)
}

// TODO: add userID
export async function findActiveSection(projectId: number) {
  return await db.query.sections.findFirst({
    where: and(eq(sections.projectId, projectId), eq(sections.active, true)),
  })
}

export async function findSectionById(userId: string, sectionId: number) {
  const result = await db.select().from(sections)
    .innerJoin(projects, eq(projects.id, sections.projectId))
    .where(and(eq(projects.userId, userId), eq(sections.id, sectionId)))
    .limit(1)

  return result[0]
}

// TODO: add userID
export async function findAllSections(projectId: number) {
  const result = await db.query.sections.findMany({
    where: eq(sections.projectId, projectId),
    orderBy: asc(sections.position)
  })
  if (result.length === 0) {
    return await db.insert(sections).values({projectId, position: 0, title: 'Section 1', active: true, blobId: generateBlobId()}).returning()
  }
  return result
}

// TODO: add userID
export async function findSectionReminders(sectionId: number) {
  return await db.query.reminders.findMany({
    where: eq(reminders.sectionId, sectionId),
    orderBy: sql`coalesce("from", "start") asc`
  })
}


// TODO: add userID
export async function updateSectionTitle(id: number, title: string) {
  await db.update(sections).set({title}).where(eq(sections.id, id))
}

// TODO: add userID
export async function updateSection(id: number, title: string, count: number, projectId: number, numOfRows?: number) {
  await db.update(sections).set({title, count, numOfRows}).where(eq(sections.id, id))
  redirect(`/sections/${id}`)
}

// TODO: add userID
export async function updateCount(sectionId: number, newCount: number) {
  if (newCount <= 1) {newCount = 1}
  if (newCount >= 999) {newCount = 999}

  const updatedCount = await db.update(sections)
    .set({count: newCount})
    .where(eq(sections.id, sectionId))
    .returning({count: sections.count});
  return updatedCount
}

// TODO: add userID
export async function changeActiveSection(projectId: number, position: number) {

  await db.update(sections).set({active: false}).where(eq(sections.projectId, projectId))

  const nextActiveSection = await db.update(sections)
    .set({active: true})
    .where(and(
      eq(sections.projectId, projectId),
      eq(sections.position, position)
    )).returning()

  redirect(`/sections/${nextActiveSection[0].id}`)
}

// TODO: add userID
export async function setActiveSection(sectionId: number) {
  await db.transaction(async (tx) => {
    const projectId = tx.select({projectId: sections.projectId}).from(sections).where(eq(sections.id, sectionId))
    await tx.update(sections).set({active: false}).where(eq(projectId, sections.projectId))
    await tx.update(sections).set({active: true}).where(eq(sections.id, sectionId))
  })
}

// TODO: add userID
export async function deleteSection(section: Section) {
  const hasSections = await findAllSections(section.projectId)

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

// TODO: add userID
export async function cloneSection(section: Section) {
  const newSectionId = await db.transaction(async (tx) => {
    await tx.update(sections).set({active: false}).where(eq(sections.projectId, section.projectId))
    await tx.update(sections).set({position: sql`${sections.position} + 1`}).where(and(eq(sections.projectId, section.projectId), gt(sections.position, section.position)))

    const sectionReminders: NewReminder[] = await tx.query.reminders.findMany({
      where: (eq(reminders.sectionId, section.id))
    })

    const sectionClone = {
      title: section.title + '2',
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

// TODO: add userID
// reminder 

export async function updateReminder(reminder: Reminder) {
  await db.update(reminders).set({...reminder}).where(eq(reminders.id, reminder.id))
  redirect(`/sections/${reminder.sectionId}`)
}

export async function createReminder(reminder: NewReminder) {
  await db.insert(reminders).values({...reminder, sectionId: reminder.sectionId})

  redirect(`/sections/${reminder.sectionId}`)
}

export async function deleteReminder(reminderId: number) {
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