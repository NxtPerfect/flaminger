CREATE TABLE "companies_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo_path" text NOT NULL,
	CONSTRAINT "companies_table_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "jobs_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"by_company_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_closed" boolean
);
--> statement-breakpoint
CREATE TABLE "jobs_to_users_table" (
	"job_id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"is_open" boolean NOT NULL,
	"is_accepted" boolean NOT NULL,
	"rejection_reason" text
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" text NOT NULL,
	"surname" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"mailing_consent" boolean NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "jobs_table" ADD CONSTRAINT "jobs_table_by_company_id_companies_table_id_fk" FOREIGN KEY ("by_company_id") REFERENCES "public"."companies_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs_to_users_table" ADD CONSTRAINT "jobs_to_users_table_job_id_jobs_table_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs_to_users_table" ADD CONSTRAINT "jobs_to_users_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;