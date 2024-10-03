
import {relations, sql} from 'drizzle-orm';
import {pgTable, serial, text, timestamp, integer, boolean, pgEnum, varchar, real} from "drizzle-orm/pg-core";

export const projectColorEnum = pgEnum('color', ['olivine', 'orchid', 'flax', 'jordy', 'tangerine'])
export const projectGaugeEnum = pgEnum('gauge_inch', ['1"', '2"', '4"']);
export const projectStatusEnum = pgEnum('status', ['wip', 'finished', 'paused', 'frogged', 'planned']);


// Todo: add blob id 
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', {mode: 'date', precision: 3}).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', {mode: 'date', precision: 3}).$onUpdate(() => new Date()),
  finishBy: timestamp('finish_by', {mode: 'date', precision: 3}),
  startDate: timestamp('start_date', {mode: 'date', precision: 3}),
  completed: timestamp('completed', {mode: 'date', precision: 3}),
  favorite: boolean('favorite').notNull().default(false),
  blobId: integer('blob_id').notNull(),
  patternId: integer('pattern_id').notNull().default(1),
  color: projectColorEnum('color').notNull().default('tangerine'),
  status: projectStatusEnum('status').notNull().default('wip'),
  userId: text('user_id').notNull(),
  pattern: text('pattern'),
  patternUrl: text('pattern_url'),
  size: text('size'),
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

export const reminderTypeEnum = pgEnum('reminders_type', ['repeating', 'range', 'single']);

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
  row: integer('row'),
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

export const needles = pgTable("needles", {
  id: serial("id").primaryKey().notNull(),
  projectId: integer("project_id").notNull(),
  size: text("size"),
  usedFor: text("used_for"),
});

export const yarn = pgTable("yarn", {
  id: serial("id").primaryKey().notNull(),
  projectId: integer("project_id").notNull(),
  name: text("name").notNull(),
  color: text("color"),
  lot: integer("lot"),
  yardage: integer("yardage"),
  grams: integer("grams"),
  skeins: real("skeins"),
  material: text("material"),
});

export const gauge = pgTable("gauge", {
  id: serial("id").primaryKey().notNull(),
  projectId: integer("project_id").notNull(),
  stitches: integer('stitches'),
  rows: integer('rows'),
  inch: projectGaugeEnum('inch'),
  needle: text('needle'),
  stitchPattern: text('stitch_pattern'),
  blocked: boolean('blocked'),
  inrounds: boolean('in_rounds'),
});