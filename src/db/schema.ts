import { sql } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, boolean, unique } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  firstname: text('firstname').notNull(),
  surname: text('surname').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  mailingConsent: boolean('mailing_consent').notNull(),
  isEmployer: boolean('is_employer').notNull().default(sql`FALSE`),
  employerCompanyId: integer('employer_company_id').references(() => companiesTable.id).default(1),
  city: text('city').notNull().default("Berlin"),
});

export const humanLanguagesUsersTable = pgTable('human_languages_users_table', {
  userId: serial('user_id').references(() => usersTable.id),
  name: text('name').notNull(),
  level: text('level').notNull().default("A1"),
}, (t) => [
  unique().on(t.userId, t.name)
]);

export const technologiesUsersTable = pgTable('technologies_users_table', {
  userId: serial('user_id').references(() => usersTable.id),
  name: text('name').notNull(),
  experience: text('experience').notNull().default("5"),
}, (t) => [
  unique().on(t.userId, t.name)
]);

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

export const technologiesRequirementsToJobsTable = pgTable('technologies_requirements_to_jobs_table', {
  jobId: serial('job_id').references(() => jobsTable.id),
  name: text('name').notNull(),
  experience: text('experience').notNull().default("5"),
})

export const humanLanguagesRequirementsToJobsTable = pgTable('human_languages_requirements_to_jobs_table', {
  jobId: serial('job_id').references(() => jobsTable.id),
  name: text('name').notNull(),
  level: text('level').notNull().default("A1"),
})

export const jobsToUsersTable = pgTable('jobs_to_users_table', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => usersTable.id, { onDelete: "cascade" }),
  jobId: serial('job_id').references(() => jobsTable.id, { onDelete: "cascade" }),
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

export type InsertTechnologiesToUsers = typeof technologiesUsersTable.$inferInsert;
export type SelectTechnologiesToUsers = typeof technologiesUsersTable.$inferSelect;

export type InsertHumanLanguagesToUsers = typeof humanLanguagesUsersTable.$inferInsert;
export type SelectHumanLanguagesToUsers = typeof humanLanguagesUsersTable.$inferSelect;

export type InsertTechnologiesRequirementsToJobs = typeof technologiesRequirementsToJobsTable.$inferInsert;
export type SelectTechnologiesRequirementsToJobs = typeof technologiesRequirementsToJobsTable.$inferSelect;

export type InsertHumanLanguagesRequirementsToJobs = typeof humanLanguagesRequirementsToJobsTable.$inferInsert;
export type SelectHumanLanguagesRequirementsToJobs = typeof humanLanguagesRequirementsToJobsTable.$inferSelect;
