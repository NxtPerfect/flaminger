ALTER TABLE "companies_table" ALTER COLUMN "acceptance_rate" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "is_employer" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "employer_company_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD CONSTRAINT "users_table_employer_company_id_companies_table_id_fk" FOREIGN KEY ("employer_company_id") REFERENCES "public"."companies_table"("id") ON DELETE no action ON UPDATE no action;