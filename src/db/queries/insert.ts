import { db } from "..";
import { companiesTable, InsertCompany, InsertJobs, InsertJobsToUsers, InsertUser, jobsTable, jobsToUsersTable, usersTable } from "../schema";

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function createJob(data: InsertJobs) {
  await db.insert(jobsTable).values(data);
}

export async function createCompany(data: InsertCompany) {
  await db.insert(companiesTable).values(data);
}

export async function createJobToUser(data: InsertJobsToUsers) {
  await db.insert(jobsToUsersTable).values(data);
}
