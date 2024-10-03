import {pgTable, pgEnum, serial, integer, text, real, timestamp, boolean} from "drizzle-orm/pg-core"
import {sql} from "drizzle-orm"

export const remindersType = pgEnum("reminders_type", ['range', 'repeating', 'single'])
export const gaugeInch = pgEnum("gauge_inch", ['4"', '2"', '1"'])
export const color = pgEnum("color", ['tangerine', 'jordy', 'flax', 'orchid', 'olivine'])
export const status = pgEnum("status", ['frogged', 'paused', 'finished', 'wip'])


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
	material: text("material").array(),
});

export const projects = pgTable("projects", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	description: text("description"),
	createdAt: timestamp("created_at", {precision: 3, mode: 'string'}).defaultNow(),
	updatedAt: timestamp("updated_at", {precision: 3, mode: 'string'}),
	favorite: boolean("favorite").default(false).notNull(),
	blobId: integer("blob_id").notNull(),
	color: color("color").default('tangerine').notNull(),
	userId: text("user_id").notNull(),
	finishBy: timestamp("finish_by", {precision: 3, mode: 'string'}),
	status: status("status").default('wip').notNull(),
	completed: timestamp("completed", {precision: 3, mode: 'string'}),
	patternId: integer("pattern_id").default(1).notNull(),
	pattern: text("pattern"),
	size: text("size"),
});

export const userSettings = pgTable("user_settings", {
	userId: text("user_id").notNull(),
	sound: boolean("sound").default(true).notNull(),
	guide: boolean("guide").default(true).notNull(),
});

export const reminders = pgTable("reminders", {
	id: serial("id").primaryKey().notNull(),
	sectionId: integer("section_id").notNull(),
	title: text("title").notNull(),
	note: text("note"),
	notification: boolean("notification").default(true).notNull(),
	type: remindersType("type").notNull(),
	interval: integer("interval"),
	times: integer("times"),
	start: integer("start"),
	from: integer("from"),
	until: integer("until"),
	row: integer("row"),
	updatedAt: timestamp("updated_at", {precision: 3, mode: 'string'}),
	createdAt: timestamp("created_at", {precision: 3, mode: 'string'}).defaultNow(),
});

export const sections = pgTable("sections", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	projectId: integer("project_id").notNull(),
	position: integer("position").notNull(),
	count: integer("count").default(1).notNull(),
	numOfRows: integer("num_of_rows").default(0),
	updatedAt: timestamp("updated_at", {precision: 3, mode: 'string'}),
	createdAt: timestamp("created_at", {precision: 3, mode: 'string'}).defaultNow(),
	active: boolean("active").default(false).notNull(),
	blobId: integer("blob_id").notNull(),
});

export const gauge = pgTable("gauge", {
	stitches: integer("stitches"),
	rows: integer("rows"),
	inch: gaugeInch("inch"),
	needle: text("needle"),
	pattern: text("pattern"),
	blocked: boolean("blocked"),
	inRounds: boolean("in_rounds"),
	id: serial("id").notNull(),
	projectId: integer("project_id").notNull(),
});