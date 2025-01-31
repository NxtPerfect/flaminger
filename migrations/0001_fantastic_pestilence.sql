ALTER TABLE "companies_table" ADD COLUMN "jobs_accepted" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "companies_table" ADD COLUMN "jobs_rejected" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "companies_table" ADD COLUMN "acceptance_rate" integer;