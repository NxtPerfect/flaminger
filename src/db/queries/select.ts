import { and, count, eq, getTableColumns, not } from "drizzle-orm";
import { db } from "..";
import { companiesTable, jobsTable, jobsToUsersTable, SelectCompany, SelectUser, usersTable } from "../schema";

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

export async function getStatisticsOfUserApplicationsByUserId(id: SelectUser['id']) {
  const [accepted] = await getAcceptedJobsForUsersbyUserId(id);

  const [rejected] = await getRejectedJobsForUserByUserId(id);

  const [total] = await getTotalJobsForUserByUserId(id);
  return { accepted, rejected, total };
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

export async function getAllJobsWithCompanyInfo() {
  return db.select()
    .from(jobsTable)
    .innerJoin(companiesTable, eq(jobsTable.byCompanyId, companiesTable.id));
}

export async function getAllJobsForLoggedUserWithCompanyInfo(userId: SelectUser['id']) {
  const { id, ...rest } = getTableColumns(jobsToUsersTable);
  return db.select({
    jobsTable,
    companiesTable,
    jobsToUsersTable: { ...rest }
  })
    .from(jobsTable)
    .innerJoin(companiesTable, eq(jobsTable.byCompanyId, companiesTable.id))
    .leftJoin(jobsToUsersTable,
      and(
        eq(jobsToUsersTable.userId, userId),
        eq(jobsToUsersTable.jobId, jobsTable.id)
      )
    );
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
