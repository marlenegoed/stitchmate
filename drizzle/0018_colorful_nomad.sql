ALTER TABLE "gauge" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "gauge" ADD COLUMN "project_id" integer NOT NULL;