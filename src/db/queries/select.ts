import { and, count, eq, exists, getTableColumns, gte, ilike, inArray, lte, not, sql } from "drizzle-orm";
import { db } from "..";
import { companiesTable, humanLanguagesRequirementsToJobsTable, humanLanguagesUsersTable, jobsTable, jobsToUsersTable, questionsToJobsTable, SelectCompany, SelectJobs, SelectUser, technologiesRequirementsToJobsTable, technologiesUsersTable, usersTable } from "../schema";
import { Filter, MAX_JOBS_PER_PAGE } from "@/app/lib/definitions";

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

export async function getJobsByCompanyId(id: SelectJobs['byCompanyId']) {
  return db.select()
    .from(jobsTable)
    .where(eq(jobsTable.byCompanyId, id));
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
    .offset(MAX_JOBS_PER_PAGE * offset)
    .limit(MAX_JOBS_PER_PAGE);
}

export async function getAllJobsForLoggedUserWithCompanyInfo(userId: SelectUser['id'], offset: number) {
  const { id: _id, ...rest } = getTableColumns(jobsToUsersTable);
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
    )
    .offset(MAX_JOBS_PER_PAGE * offset)
    .limit(MAX_JOBS_PER_PAGE);
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

export async function getTechnologiesForMax20jobs(offset: number) {
  const uniqueIds = await getUniqueIdsFor20jobs(offset);
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

export async function getHumanLanguagesForMax20jobs(offset: number) {
  const uniqueIds = await getUniqueIdsFor20jobs(offset);
  const parsedIds = uniqueIds.map(id => id.id);
  return db.select()
    .from(humanLanguagesRequirementsToJobsTable)
    .where(inArray(humanLanguagesRequirementsToJobsTable.jobId, parsedIds));
}

export async function getUniqueIdsFor20jobs(offset: number) {
  return db.select({ id: jobsTable.id })
    .from(jobsTable)
    .offset(MAX_JOBS_PER_PAGE * offset)
    .limit(MAX_JOBS_PER_PAGE);
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

export async function getJobsFiltered(userId: number, offset: number, filter: Filter) {
  const { id: _id, ...rest } = getTableColumns(jobsToUsersTable);

  return db.select({
    jobsTable,
    companiesTable,
    ...(userId === -1 ? {} : { jobsToUsersTable: { ...rest } }),
  })
    .from(jobsTable)
    .where(buildJobFilterConditions(filter))
    .innerJoin(companiesTable, buildCompanyJoinConditions(filter))
    .leftJoin(jobsToUsersTable, buildUserJoinConditions(userId))
    .offset(MAX_JOBS_PER_PAGE * offset)
    .limit(MAX_JOBS_PER_PAGE);
}

export async function getCountFilteredJobs(userId: number, filter: Filter) {
  return db.select({ count: count() })
    .from(jobsTable)
    .where(buildJobFilterConditions(filter))
    .innerJoin(companiesTable, buildCompanyJoinConditions(filter))
    .leftJoin(jobsToUsersTable, buildUserJoinConditions(userId));
}

function buildJobFilterConditions(filter: Filter) {
  return and(
    ilike(jobsTable.title, `%${filter.title}%`),
    gte(jobsTable.minSalary, filter.minSalary),
    lte(jobsTable.maxSalary, filter.maxSalary),
    isInJobArrayOrEmptyArray(filter),
    isInContractArrayOrEmptyArray(filter),
    isInWorkhourArrayOrEmptyArray(filter),
    ilike(jobsTable.city, `%${filter.city}%`),
    hasRequiredTechnology(filter),
    hasRequiredLanguage(filter)
  );
}

function isInJobArrayOrEmptyArray(filter: Filter) {
  if (filter.jobType.length === 0) return eq(sql`1`, sql`1`);
  return inArray(jobsTable.jobType, filter.jobType);
}

function isInWorkhourArrayOrEmptyArray(filter: Filter) {
  if (filter.workhourType.length === 0) return eq(sql`1`, sql`1`);
  return inArray(jobsTable.workhourType, filter.workhourType);
}

function isInContractArrayOrEmptyArray(filter: Filter) {
  if (filter.contractType.length === 0) return eq(sql`1`, sql`1`);
  return inArray(jobsTable.contractType, filter.contractType);
}

function buildCompanyJoinConditions(filter: Filter) {
  return and(
    ilike(companiesTable.name, `%${filter.companyName}%`),
    eq(jobsTable.byCompanyId, companiesTable.id)
  );
}

function buildUserJoinConditions(userId: number) {
  return and(
    eq(jobsToUsersTable.userId, userId),
    eq(jobsToUsersTable.jobId, jobsTable.id)
  );
}

function hasRequiredTechnology(filter: Filter) {
  if (filter.technologies.length === 0) return eq(sql`1`, sql`1`);
  const technologies = filter.technologies.map((t) => t.name);
  return exists(
    db.select()
      .from(technologiesRequirementsToJobsTable)
      .where(
        and(
          eq(
            technologiesRequirementsToJobsTable.jobId, jobsTable.id
          ),
          inArray(technologiesRequirementsToJobsTable.name, technologies)
        )
      )
  );
}

function hasRequiredLanguage(filter: Filter) {
  if (filter.humanLanguages.length === 0) return eq(sql`1`, sql`1`);
  const languages = filter.humanLanguages.map((l) => l.name);
  return exists(
    db.select()
      .from(humanLanguagesRequirementsToJobsTable)
      .where(
        and(
          eq(
            humanLanguagesRequirementsToJobsTable.jobId, jobsTable.id
          ),
          inArray(humanLanguagesRequirementsToJobsTable.name, languages)
        )
      )
  );
}

export async function getTechnologiesForMultipleIds(userIds: number[]) {
  return db.select()
    .from(technologiesRequirementsToJobsTable)
    .where(inArray(technologiesRequirementsToJobsTable.jobId, userIds));
}

export async function getHumanLanguagesForMultipleIds(userIds: number[]) {
  return db.select()
    .from(humanLanguagesRequirementsToJobsTable)
    .where(inArray(humanLanguagesRequirementsToJobsTable.jobId, userIds));
}

export async function getAllCities() {
  return db.selectDistinct({ city: jobsTable.city })
    .from(jobsTable);
}

export async function getQuestionsByJobId(jobId: number) {
  return db.select()
    .from(questionsToJobsTable)
    .where(eq(questionsToJobsTable.jobId, jobId));
}
