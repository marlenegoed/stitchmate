ALTER TYPE "status" ADD VALUE 'planned';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "start_date" timestamp (3);