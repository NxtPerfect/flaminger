import { HumanLanguage, Technology } from "@/app/lib/definitions";
import { db } from "..";
import { companiesTable, humanLanguagesRequirementsToJobsTable, InsertCompany, InsertJobs, InsertJobsToUsers, InsertQuestionsToJobs, InsertUser, jobsTable, jobsToUsersTable, questionsToJobsTable, technologiesRequirementsToJobsTable, usersTable } from "../schema";

export async function createUser(data: InsertUser) {
  try {
    await db.insert(usersTable).values(data);
  } catch (e) {
    throw new Error(`User exists ${e}`);
  }
}

export async function createJob(data: InsertJobs, tech: Technology[], lang: HumanLanguage[]) {
  const [{ jobId: jobId }] = await db.insert(jobsTable).values(data).returning({ jobId: jobsTable.id });
  for (let i = 0; i < tech.length; i++) {
    await db.insert(technologiesRequirementsToJobsTable).values({ name: tech[i].name, experience: tech[i].experience.toString(), jobId: jobId });
  }
  for (let i = 0; i < lang.length; i++) {
    await db.insert(humanLanguagesRequirementsToJobsTable).values({ ...lang[i], jobId: jobId });
  }
  return jobId;
}

export async function createCompany(data: InsertCompany) {
  await db.insert(companiesTable).values(data);
}

export async function createJobToUser(data: InsertJobsToUsers) {
  await db.insert(jobsToUsersTable).values(data);
}

export async function createQuestion(data: InsertQuestionsToJobs[]) {
  await db.insert(questionsToJobsTable).values(data);
}
