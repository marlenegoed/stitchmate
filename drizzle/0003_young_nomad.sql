ALTER TABLE "projects" ADD COLUMN "favorite" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "blob_id" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "color" varchar(7) DEFAULT '#E78573';