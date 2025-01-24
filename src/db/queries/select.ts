import { eq } from "drizzle-orm";
import { db } from "..";
import { jobsTable, jobsToUsersTable, SelectUser, usersTable } from "../schema";

export async function getUserByEmail(email: SelectUser['email']) {
  return db.select().from(usersTable).where(eq(usersTable.email, email));
}

export async function getAllJobs() {
  return db.select().from(jobsTable);
}

export async function getAppliedJobs(id: SelectUser['id']) {
  return db.select()
    .from(jobsToUsersTable)
    .where(eq(usersTable.id, id))
    .innerJoin(jobsTable, eq(jobsToUsersTable.jobId, jobsTable.id));
}
