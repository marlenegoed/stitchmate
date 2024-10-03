ALTER TYPE "reminders_type" ADD VALUE 'single';--> statement-breakpoint
ALTER TABLE "reminders" ADD COLUMN "row" integer;