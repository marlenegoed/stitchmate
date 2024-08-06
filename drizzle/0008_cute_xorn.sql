DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('wip', 'finished', 'paused', 'frogged');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "finish_by" timestamp (3);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "status" "status" DEFAULT 'wip' NOT NULL;