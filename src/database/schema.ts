
import {relations, sql} from 'drizzle-orm';
import {pgTable, serial, text, timestamp, integer, boolean, pgEnum, varchar} from "drizzle-orm/pg-core";

export const projectColorEnum = pgEnum('color', ['olivine', 'orchid', 'flax', 'jordy', 'tangerine'])
export const projectGaugeEnum = pgEnum('gauge_inch', ['1"', '2"', '4"']);

// Todo: add blob id 
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  gaugeStitches: integer('gauge_stitches'),
  gaugeRows: integer('gauge_rows'),
  gaugeInch: projectGaugeEnum('gauge_inch'),
  yarn: text('yarn').array(),
  needles: text('needles').array(),
  description: text('description'),
  createdAt: timestamp('created_at', {mode: 'date', precision: 3}).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', {mode: 'date', precision: 3}).$onUpdate(() => new Date()),
  favorite: boolean('favorite').notNull().default(false),
  blobId: integer('blob_id').notNull(),
  color: projectColorEnum('color').notNull().default('tangerine'),
  userId: text('user_id').notNull()
});


export const projectRelations = relations(projects, ({one, many}) => ({
  sections: many(sections),
}));

export const sections = pgTable('sections', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  projectId: integer('project_id').notNull(),
  position: integer('position').notNull(),
  count: integer('count').notNull().default(1),
  numOfRows: integer('num_of_rows').default(0),
  updatedAt: timestamp('updated_at', {mode: 'date', precision: 3}).$onUpdate(() => new Date()),
  createdAt: timestamp('created_at', {mode: 'date', precision: 3}).default(sql`CURRENT_TIMESTAMP`),
  active: boolean('active').notNull().default(false),
  blobId: integer('blob_id').notNull(),
})

export const sectionRelations = relations(sections, ({one, many}) => ({
  project: one(projects, {
    fields: [sections.projectId],
    references: [projects.id],
  }),
  reminders: many(reminders)
}));

export const reminderTypeEnum = pgEnum('reminders_type', ['repeating', 'range']);

export const reminders = pgTable('reminders', {
  id: serial('id').primaryKey(),
  sectionId: integer('section_id').notNull(),
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

export const userSettings = pgTable('user_settings', {
  userId: text('user_id').notNull(),
  sound: boolean('sound').notNull().default(true),
  guide: boolean('guide').notNull().default(true),
})

