DO $$ BEGIN
 CREATE TYPE "reminders_type" AS ENUM('repeating', 'range');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"gauge" text,
	"yarn" text,
	"needles" text,
	"description" text,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp (3),
	"section_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reminders" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" integer,
	"title" text NOT NULL,
	"note" text,
	"notification" boolean DEFAULT true NOT NULL,
	"type" "reminders_type" NOT NULL,
	"interval" integer,
	"times" integer,
	"start" integer,
	"from" integer,
	"until" integer,
	"updated_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"position" integer,
	"count" integer DEFAULT 1 NOT NULL,
	"num_of_rows" integer,
	"updated_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP
);
