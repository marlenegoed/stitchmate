
import {relations, sql} from 'drizzle-orm';
import {pgTable, serial, text, timestamp, integer, boolean, pgEnum} from "drizzle-orm/pg-core";

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  gauge: text('gauge'),
  yarn: text('yarn'),
  needles: text('needles'),
  description: text('description'),
  createdAt: timestamp('created_at', {mode: 'date', precision: 3}).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', {mode: 'date', precision: 3}).$onUpdate(() => new Date()),
  lastSectionId: integer('section_id')
});

export const projectRelations = relations(projects, ({many, one}) => ({
  sections: many(sections),
  lastSection: one(sections, {
    fields: [projects.lastSectionId],
    references: [sections.id],
  }),
}));

export const sections = pgTable('sections', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id'),
  position: integer('position'),
  count: integer('count').notNull().default(1),
  numOfRows: integer('num_of_rows'),
  updatedAt: timestamp('updated_at', {mode: 'date', precision: 3}).$onUpdate(() => new Date()),
  createdAt: timestamp('created_at', {mode: 'date', precision: 3}).default(sql`CURRENT_TIMESTAMP`),
})

export const sectionRelations = relations(sections, ({one, many}) => ({
  project: one(projects, {
    fields: [sections.projectId],
    references: [projects.id],
  }),
  reminder: many(reminders)
}));

export const reminderTypeEnum = pgEnum('reminders_type', ['repeating', 'range']);

export const reminders = pgTable('reminders', {
  id: serial('id').primaryKey(),
  sectionId: integer('section_id'),
  title: text('title').notNull(),
  note: text('note'),
  notification: boolean('notification').notNull().default(true),
  type: reminderTypeEnum('type').notNull(),
  interval: integer('interval'),
  times: integer('times'),
  start: integer('start'),
  from: integer('from'),
  until: integer('until'),
  updatedAt: timestamp('updated_at', {mode: 'date', precision: 3}).$onUpdate(() => new Date()),
  createdAt: timestamp('created_at', {mode: 'date', precision: 3}).default(sql`CURRENT_TIMESTAMP`),
})

export const reminderRelations = relations(reminders, ({one}) => ({
  section: one(sections, {
    fields: [reminders.sectionId],
    references: [sections.id]
  })
}))