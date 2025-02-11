import { sql } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  firstname: text('firstname').notNull(),
  surname: text('surname').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  mailingConsent: boolean('mailing_consent').notNull(),
  isEmployer: boolean('is_employer').notNull().default(sql`FALSE`),
  employerCompanyId: serial('employer_company_id').references(() => companiesTable.id).default(1),
});

export const companiesTable = pgTable('companies_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  jobsAccepted: integer('jobs_accepted').default(0),
  jobsRejected: integer('jobs_rejected').default(0),
  acceptanceRate: integer('acceptance_rate').default(0).$onUpdate(() => {
    return sql`CASE
    WHEN "jobs_accepted" + "jobs_rejected" = 0 THEN 0
    ELSE ROUND((CAST("jobs_accepted" AS FLOAT) / CAST("jobs_accepted" + "jobs_rejected" AS FLOAT)) * 100, 4)
    END`
  }),
});

export const jobsTable = pgTable('jobs_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  byCompanyId: integer('by_company_id')
    .notNull()
    .references(() => companiesTable.id, { onDelete: 'no action' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  isClosed: boolean('is_closed').default(false),
});

export const jobsToUsersTable = pgTable('jobs_to_users_table', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => usersTable.id),
  jobId: serial('job_id').references(() => jobsTable.id),
  isApplied: boolean('is_applied').notNull(),
  isApplicationInProgress: boolean('is_application_in_progress').notNull(),
  isAccepted: boolean('is_accepted').notNull(),
  rejectionReason: text('rejection_reason'),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertCompany = typeof companiesTable.$inferInsert;
export type SelectCompany = typeof companiesTable.$inferSelect;

export type InsertJobs = typeof jobsTable.$inferInsert;
export type SelectJobs = typeof jobsTable.$inferSelect;

export type InsertJobsToUsers = typeof jobsToUsersTable.$inferInsert;
export type SelectJobsToUsers = typeof jobsToUsersTable.$inferSelect;
