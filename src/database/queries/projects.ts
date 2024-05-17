'use server'

import {eq, and, gte, sql, asc} from 'drizzle-orm'
import {db} from '../db'
import {projects, sections, reminders} from '../schema'
import {redirect} from 'next/navigation';


export type NewProject = typeof projects.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type Reminder = typeof reminders.$inferSelect;
export type NewReminder = typeof reminders.$inferInsert
export type Section = typeof sections.$inferSelect;
export type NewSection = typeof sections.$inferInsert

// projects 

export async function createNewProject(title: string) {
  const projectId = await db.insert(projects).values({title}).returning({id: projects.id})
  await db.insert(sections).values({title: 'Section 1', projectId: projectId[0].id, position: 1, active: true})
  redirect(`/projects/${projectId[0].id}/edit`)
}

export async function quickStartProject(title: string) {
  const projectId = await db.insert(projects).values({title}).returning({id: projects.id})
  const sectionId = await db.insert(sections).values({title: 'Section 1', projectId: projectId[0].id, position: 1, active: true}).returning({id: sections.id})
  redirect(`/sections/${sectionId[0].id}`)
}

export async function updateProject(id: number, project: NewProject) {
  await db.update(projects).set({...project}).where(eq(projects.id, id))
  const section = await findActiveSection(id)
  if (!section) {throw new Error('no section found')}
  redirect(`/sections/${section.id}`)
}


export async function getAllProjects() {
  return await db.query.projects.findMany()
}

export async function findProject(id: number) {
  return await db.query.projects.findFirst({
    where: eq(projects.id, id)
  })
}

export async function deleteProject(id: number) {
  await db.delete(projects).where(eq(projects.id, id));
}


// sections


// new
export async function createNewSection(projectId: number, position: number, title: string) {
  await db.update(sections).set({active: false}).where(eq(sections.projectId, projectId))
  await db.update(sections).set({position: sql`${sections.position} + 1`}).where(and(eq(sections.projectId, projectId), gte(sections.position, position)))

  const newSection = await db.insert(sections).values({projectId, position, title, active: true}).returning({id: sections.id})
  redirect(`/sections/${newSection[0].id}`)
}


// find sections
export async function findActiveSection(projectId: number) {
  return await db.query.sections.findFirst({
    with: {
      reminders: true
    },
    where: and(eq(sections.projectId, projectId), eq(sections.active, true)),
  })
}

export async function findSectionById(sectionId: number) {

  return await db.query.sections.findFirst({
    with: {
      reminders: true
    },
    where: (eq(sections.id, sectionId)),
  })
}

export async function findAllSections(projectId: number) {
  const result = await db.query.sections.findMany({
    where: eq(sections.projectId, projectId),
    orderBy: asc(sections.position)
  })
  if (result.length === 0) {
    return await db.insert(sections).values({projectId, position: 1, title: 'Section 1', active: true}).returning()
  }
  return result
}




// update sections 

export async function updateSectionTitle(id: number, title: string) {
  await db.update(sections).set({title}).where(eq(sections.id, id))
}

export async function updateSection(id: number, title: string, count: number, projectId: number, numOfRows?: number) {
  await db.update(sections).set({title, count, numOfRows}).where(eq(sections.id, id))
  redirect(`/sections/${id}`)
}


export async function updateCount(sectionId: number, newCount: number) {

  if (newCount <= 1) {newCount = 1}
  if (newCount >= 999) {newCount = 999}

  const updatedCount = await db.update(sections)
    .set({count: newCount})
    .where(eq(sections.id, sectionId))
    .returning({count: sections.count});
  return updatedCount
}


export async function changeActiveSection(projectId: number, position: number) {

  await db.update(sections).set({active: false}).where(eq(sections.projectId, projectId))

  const nextActiveSection = await db.update(sections)
    .set({active: true})
    .where(and(
      eq(sections.projectId, projectId),
      eq(sections.position, position)
    )).returning()

  console.log(nextActiveSection[0].id)
  redirect(`/sections/${nextActiveSection[0].id}`)
}

export async function setActiveSection(sectionId: number) {
  const projectId = db.select({projectId: sections.projectId}).from(sections).where(eq(sections.id, sectionId))
  await db.update(sections).set({active: false}).where(eq(projectId, sections.projectId))
  await db.update(sections).set({active: true}).where(eq(sections.id, sectionId))
}


export async function deleteSection(section: Section) {

  const hasSections = await findAllSections(section.projectId)

  if (hasSections.length <= 1) {
    throw new Error('project must have at least one section')
  }

  await db.delete(sections).where(eq(sections.id, section.id))

  if (section.position !== hasSections.length) {
    await db.update(sections).set({position: sql`${sections.position} -1`}).where(and(eq(sections.projectId, section.projectId), gte(sections.position, section.position)))

  }

  if (section.position === 1) {
    const nextSectionId = hasSections[section.position].id
    redirect(`/sections/${nextSectionId}`)
  } else {
    const previousSectionId = hasSections[section.position - 2].id
    redirect(`/sections/${previousSectionId}`)
  }
}




export async function cloneSection(section: Section) {

  await db.update(sections).set({active: false}).where(eq(sections.projectId, section.projectId))

  const sectionReminders: NewReminder[] = await db.query.reminders.findMany({
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

  const newSectionId = await db.insert(sections).values({...sectionClone}).returning({id: sections.id})

  for (let reminder of sectionReminders) {
    delete reminder.id
  }
  for (let reminder of sectionReminders) {
    await db.insert(reminders).values({...reminder, sectionId: newSectionId[0].id})
  }
  redirect(`/sections/${newSectionId}`)
}


// reminder 

export async function findReminderById(reminderId: string) {

  const numId = parseInt(reminderId)
  return await db.query.reminders.findFirst({
    where: eq(reminders.id, numId)
  })
}

export async function updateReminder(reminder: Reminder) {

  await db.update(reminders).set({...reminder}).where(eq(reminders.id, reminder.id))

  const section = await findSectionById(reminder.sectionId)
  redirect(`/sections/${reminder.sectionId}`)
}


export async function createReminder(reminder: NewReminder) {

  await db.insert(reminders).values({...reminder, sectionId: reminder.sectionId})

  redirect(`/sections/${reminder.sectionId}`)

}

export async function deleteReminder(reminderId: number) {

  return await db.delete(reminders).where(eq(reminders.id, reminderId))

}
