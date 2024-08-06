CREATE TABLE IF NOT EXISTS "needles" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"size" text,
	"used_for" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "yarn" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"name" text NOT NULL,
	"color" text,
	"lot" integer,
	"meters" integer,
	"grams" integer,
	"skeins" real,
	"material" text[]
);
