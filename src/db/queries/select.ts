import { and, count, eq, getTableColumns, inArray, not } from "drizzle-orm";
import { db } from "..";
import { companiesTable, humanLanguagesRequirementsToJobsTable, humanLanguagesUsersTable, jobsTable, jobsToUsersTable, SelectCompany, SelectJobs, SelectUser, technologiesRequirementsToJobsTable, technologiesUsersTable, usersTable } from "../schema";
import { MAX_JOBS_PER_PAGE } from "@/app/lib/definitions";

export async function getUserByEmail(email: SelectUser['email']) {
  return db.select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
}

export async function getUserById(id: SelectUser['id']) {
  return db.select()
    .from(usersTable)
    .where(eq(usersTable.id, id));
}

export async function getCompanyById(id: SelectCompany['id']) {
  return db.select()
    .from(companiesTable)
    .where(eq(companiesTable.id, id));
}

export async function getCompanyIdByEmployerid(id: SelectUser['id']) {
  return db.select({
    companyId: usersTable.employerCompanyId
  })
    .from(usersTable)
    .where(eq(usersTable.id, id))
}

export async function getStatisticsOfUserApplicationsByUserId(id: SelectUser['id']) {
  const [accepted] = await getAcceptedJobsForUsersbyUserId(id);

  const [rejected] = await getRejectedJobsForUserByUserId(id);

  const [total] = await getTotalJobsForUserByUserId(id);
  return { accepted, rejected, total };
}

export async function getJobById(id: SelectJobs['id']) {
  return db.select()
    .from(jobsTable)
    .where(eq(jobsTable.id, id));
}

export async function getAcceptedJobsForUsersbyUserId(id: SelectUser['id']) {
  return db.select({
    count: count()
  })
    .from(jobsToUsersTable)
    .where(
      and(
        jobsToUsersTable.isAccepted,
        and(
          not(jobsToUsersTable.isApplicationInProgress)),
        eq(jobsToUsersTable.userId, id)
      )
    )
}

export async function getRejectedJobsForUserByUserId(id: SelectUser['id']) {
  return db.select({
    count: count()
  })
    .from(jobsToUsersTable)
    .where(
      and(
        not(jobsToUsersTable.isAccepted),
        and(
          not(jobsToUsersTable.isApplicationInProgress)),
        eq(jobsToUsersTable.userId, id)
      )
    );
}

export async function getTotalJobsForUserByUserId(id: SelectUser['id']) {
  return db.select({
    count: count()
  })
    .from(jobsToUsersTable)
    .where(
      eq(jobsToUsersTable.userId, id)
    );
}

export async function getPendingUserApplicationsByUserId(id: SelectUser['id']) {
  return db.select({
    jobsTable,
    company: companiesTable.name
  })
    .from(jobsToUsersTable)
    .where(
      and(
        eq(jobsToUsersTable.userId, id),
        jobsToUsersTable.isApplicationInProgress
      )
    )
    .innerJoin(jobsTable, eq(jobsToUsersTable.jobId, jobsTable.id))
    .innerJoin(companiesTable, eq(jobsTable.byCompanyId, companiesTable.id));
}

export async function getAllJobsWithCompanyInfo(offset: number) {
  return db.select({ jobsTable, companiesTable })
    .from(jobsTable)
    .innerJoin(companiesTable, eq(jobsTable.byCompanyId, companiesTable.id))
    .limit(MAX_JOBS_PER_PAGE)
    .offset(MAX_JOBS_PER_PAGE * offset);
}

export async function getAllJobsForLoggedUserWithCompanyInfo(userId: SelectUser['id'], offset: number) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...rest } = getTableColumns(jobsToUsersTable);
  return db.select({
    jobsTable,
    companiesTable,
    jobsToUsersTable: { ...rest },
  })
    .from(jobsTable)
    .innerJoin(companiesTable, eq(jobsTable.byCompanyId, companiesTable.id))
    .leftJoin(jobsToUsersTable,
      and(
        eq(jobsToUsersTable.userId, userId),
        eq(jobsToUsersTable.jobId, jobsTable.id)
      )
    )
    .limit(MAX_JOBS_PER_PAGE)
    .offset(MAX_JOBS_PER_PAGE * offset);
}

export async function getTechnologiesForAllJobs() {
  return db.select()
    .from(technologiesRequirementsToJobsTable);
}

export async function getTechnologiesForJobId(jobId: SelectJobs['id']) {
  return db.select()
    .from(technologiesRequirementsToJobsTable)
    .where(eq(technologiesRequirementsToJobsTable.jobId, jobId));
}

export async function getTechnologiesForMaxMAX_JOBS_PER_PAGEjobs(offset: number) {
  const uniqueIds = await getUniqueIdsForMAX_JOBS_PER_PAGEjobs(offset);
  const parsedIds = uniqueIds.map(id => id.id);
  return db.select()
    .from(technologiesRequirementsToJobsTable)
    .where(inArray(technologiesRequirementsToJobsTable.jobId, parsedIds));
}

export async function getHumanLanguagesForAllJobs() {
  return db.select()
    .from(humanLanguagesRequirementsToJobsTable);
}

export async function getHumanLanguagesForJobId(jobId: SelectJobs['id']) {
  return db.select()
    .from(humanLanguagesRequirementsToJobsTable)
    .where(eq(humanLanguagesRequirementsToJobsTable.jobId, jobId));
}

export async function getHumanLanguagesForMaxMAX_JOBS_PER_PAGEjobs(offset: number) {
  const uniqueIds = await getUniqueIdsForMAX_JOBS_PER_PAGEjobs(offset);
  const parsedIds = uniqueIds.map(id => id.id);
  return db.select()
    .from(humanLanguagesRequirementsToJobsTable)
    .where(inArray(humanLanguagesRequirementsToJobsTable.jobId, parsedIds));
}

export async function getUniqueIdsForMAX_JOBS_PER_PAGEjobs(offset: number) {
  return db.select({ id: jobsTable.id })
    .from(jobsTable)
    .limit(MAX_JOBS_PER_PAGE)
    .offset(MAX_JOBS_PER_PAGE * offset);
}

export async function getAppliedJobs(id: SelectUser['id']) {
  return db.select()
    .from(jobsToUsersTable)
    .where(eq(usersTable.id, id))
    .innerJoin(jobsTable, eq(jobsToUsersTable.jobId, jobsTable.id));
}

export async function getCompletedUserApplicationsByUserId(id: SelectUser['id']) {
  return db.select({
    jobsTable,
    company: companiesTable.name,
    isAccepted: jobsToUsersTable.isAccepted,
    rejectionReason: jobsToUsersTable.rejectionReason,
  })
    .from(jobsToUsersTable)
    .where(
      and(
        eq(jobsToUsersTable.userId, id),
        not(jobsToUsersTable.isApplicationInProgress)
      )
    )
    .innerJoin(jobsTable, eq(jobsToUsersTable.jobId, jobsTable.id))
    .innerJoin(companiesTable, eq(jobsTable.byCompanyId, companiesTable.id));
}

export async function getHumanLanguagesByUserId(id: SelectUser['id']) {
  return db.select()
    .from(humanLanguagesUsersTable)
    .where(
      eq(humanLanguagesUsersTable.userId, id)
    );
}

export async function getTechnologiesByUserId(id: SelectUser['id']) {
  return db.select()
    .from(technologiesUsersTable)
    .where(
      eq(technologiesUsersTable.userId, id)
    );
}

export async function getApplicationsByCompanyId(companyId: SelectCompany['id']) {
  return db.select()
    .from(jobsToUsersTable)
    .innerJoin(jobsTable,
      and(
        eq(jobsToUsersTable.jobId, jobsTable.id),
        and(
          eq(jobsTable.byCompanyId, companyId),
          jobsToUsersTable.isApplicationInProgress
        )
      )
    )
    .limit(MAX_JOBS_PER_PAGE);
}

export async function getJobsMaxPages() {
  return db.select({
    count: count()
  }
  )
    .from(jobsTable);
}
