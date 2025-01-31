ALTER TABLE "jobs_to_users_table" RENAME COLUMN "is_open" TO "is_applied";--> statement-breakpoint
ALTER TABLE "jobs_to_users_table" ADD COLUMN "is_application_in_progress" boolean NOT NULL;