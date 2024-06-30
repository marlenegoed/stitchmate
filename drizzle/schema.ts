import { pgTable, pgEnum, text, boolean, serial, integer, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const oneTimeTokenType = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])
export const color = pgEnum("color", ['olivine', 'orchid', 'flax', 'jordy', 'tangerine'])
export const gaugeInch = pgEnum("gauge_inch", ['1"', '2"', '4"'])
export const remindersType = pgEnum("reminders_type", ['repeating', 'range'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const equalityOp = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])


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
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow(),
});

export const projects = pgTable("projects", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	gaugeStitches: integer("gauge_stitches"),
	gaugeRows: integer("gauge_rows"),
	gaugeInch: gaugeInch("gauge_inch"),
	yarn: text("yarn").array(),
	needles: text("needles").array(),
	description: text("description"),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }),
	favorite: boolean("favorite").default(false).notNull(),
	blobId: integer("blob_id").notNull(),
	color: color("color").default('tangerine').notNull(),
	userId: text("user_id").notNull(),
});

export const sections = pgTable("sections", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	projectId: integer("project_id").notNull(),
	position: integer("position").notNull(),
	count: integer("count").default(1).notNull(),
	numOfRows: integer("num_of_rows").default(0),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow(),
	active: boolean("active").default(false).notNull(),
	blobId: integer("blob_id").notNull(),
});