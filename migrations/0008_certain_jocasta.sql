ALTER TABLE "companies_table" ALTER COLUMN "acceptance_rate" SET DEFAULT CASE
    WHEN "jobs_accepted" + "jobs_rejected" = 0 THEN 0
    ELSE ROUND((CAST("jobs_accepted" AS FLOAT) / CAST("jobs_accepted" + "jobs_rejected" AS FLOAT)) * 100, 4)
    END;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "is_employer" boolean DEFAULT false;