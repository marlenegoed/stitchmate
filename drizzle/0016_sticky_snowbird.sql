CREATE TABLE IF NOT EXISTS "gauge" (
	"stitches" integer,
	"rows" integer,
	"inch" "gauge_inch",
	"needle" text,
	"pattern" text,
	"blocked" boolean,
	"in_rounds" boolean
);
--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "gauge_stitches";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "gauge_rows";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "gauge_inch";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "gauge_needles";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "gauge_pattern";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "gauge_blocked";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "gauge_in_round";