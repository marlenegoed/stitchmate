ALTER TABLE "yarn" RENAME COLUMN "meters" TO "yardage";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "yarn";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "needles";