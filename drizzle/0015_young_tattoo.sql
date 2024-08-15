ALTER TABLE "projects" ADD COLUMN "gauge_needles" text[];--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "gauge_pattern" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "gauge_blocked" boolean;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "gauge_in_round" boolean;