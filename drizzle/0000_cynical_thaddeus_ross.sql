DO $$ BEGIN
 CREATE TYPE "color" AS ENUM('champagne', 'olivine', 'orchid', 'flax', 'jordy', 'tangerine', 'caramel');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "gauge_inch" AS ENUM('1"', '2"', '4"');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "reminders_type" AS ENUM('repeating', 'range');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"gauge_stitches" integer,
	"gauge_rows" integer,
	"gauge_inch" "gauge_inch",
	"yarn" text[],
	"needles" text[],
	"description" text,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp (3),
	"favorite" boolean DEFAULT false NOT NULL,
	"blob_id" integer NOT NULL,
	"color" "color" DEFAULT 'tangerine' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reminders" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" integer NOT NULL,
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
	"title" text NOT NULL,
	"project_id" integer NOT NULL,
	"position" integer NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	"num_of_rows" integer DEFAULT 0,
	"updated_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP,
	"active" boolean DEFAULT false NOT NULL
);
