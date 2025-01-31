import { eq } from "drizzle-orm";
import { db } from "..";
import { companiesTable, jobsTable, jobsToUsersTable, SelectCompany, SelectUser, usersTable } from "../schema";

export async function getUserByEmail(email: SelectUser['email']) {
  return db.select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
}

export async function getAllJobsWithCompanyInfo() {
  return db.select()
    .from(jobsTable)
    .innerJoin(companiesTable, eq(jobsTable.byCompanyId, companiesTable.id));
}

export async function getAllJobsForLoggedUserWithCompanyInfo(id: SelectUser['id']) {
  return db.select()
    .from(jobsTable)
    .innerJoin(companiesTable, eq(jobsTable.byCompanyId, companiesTable.id))
    .leftJoin(jobsToUsersTable, eq(jobsToUsersTable.userId, id));
}

export async function getAppliedJobs(id: SelectUser['id']) {
  return db.select()
    .from(jobsToUsersTable)
    .where(eq(usersTable.id, id))
    .innerJoin(jobsTable, eq(jobsToUsersTable.jobId, jobsTable.id));
}

export async function getCompanyById(id: SelectCompany['id']) {
  return db.select()
    .from(companiesTable)
    .where(eq(companiesTable.id, id));
}
