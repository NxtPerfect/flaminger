import { and, count, eq, getTableColumns, gte, inArray, like, lte, not } from "drizzle-orm";
import { db } from "..";
import { companiesTable, humanLanguagesRequirementsToJobsTable, humanLanguagesUsersTable, jobsTable, jobsToUsersTable, SelectCompany, SelectJobs, SelectUser, technologiesRequirementsToJobsTable, technologiesUsersTable, usersTable } from "../schema";
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

export async function getJobsIncludingTitle(title: SelectJobs['title'], offset: number) {
  return db.select()
    .from(jobsTable)
    .where(like(jobsTable.title, `%${title}%`))
    .offset(MAX_JOBS_PER_PAGE * offset)
    .limit(MAX_JOBS_PER_PAGE);
}

export async function getFilteredJobsByTitleForLoggedInUser(title: SelectJobs['title'], userId: number, offset: number) {
  const { id: _id, ...rest } = getTableColumns(jobsToUsersTable);
  return db.select({
    jobsTable,
    companiesTable,
    jobsToUsersTable: { ...rest },
  })
    .from(jobsTable)
    .where(like(jobsTable.title, `%${title}%`))
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

export async function getJobsByCompanyName(companyName: SelectCompany['name'], table?: typeof jobsTable) {
  return db.select({ jobsTable })
    .from(table ?? jobsTable)
    .innerJoin(companiesTable,
      and(
        eq(table?.byCompanyId ?? jobsTable.byCompanyId, companiesTable.id),
        like(companiesTable.name, `%${companyName}%`)
      )
    );
}

export async function getJobsByMinSalary(minSalary: number, table?: typeof jobsTable) {
  return db.select()
    .from(table ?? jobsTable)
    .where(gte(table?.minSalary ?? jobsTable.minSalary, minSalary));
}

export async function getJobsByMaxSalary(maxSalary: number, table?: typeof jobsTable) {
  return db.select()
    .from(table ?? jobsTable)
    .where(lte(table?.maxSalary ?? jobsTable.maxSalary, maxSalary));
}

export async function getJobsByJobType(jobType: SelectJobs['jobType'], table?: typeof jobsTable) {
  return db.select()
    .from(table ?? jobsTable)
    .where(like(table?.jobType ?? jobsTable.jobType, `%${jobType}%`));
}

export async function getJobsByContractType(contractType: SelectJobs['contractType'], table?: typeof jobsTable) {
  return db.select()
    .from(table ?? jobsTable)
    .where(like(table?.contractType ?? jobsTable.contractType, `%${contractType}%`));
}

export async function getJobsByCity(city: SelectJobs['city'], table?: typeof jobsTable) {
  return db.select()
    .from(table ?? jobsTable)
    .where(like(table?.city ?? jobsTable.city, `%${city}%`));
}

export async function getJobsFiltered(filter: Filter) {
  // query for each filter parameter
  // then combine and limit to 20
  // and offset
  const byTitle = db.select()
    .from(jobsTable)
    .where(like(jobsTable.title, `%${filter.companyName}%`)).as('byTitle');

  const byCompanyName = db.select({ jobsTable })
    .from(byTitle)
    .innerJoin(companiesTable,
      and(
        eq(jobsTable.byCompanyId, companiesTable.id),
        like(companiesTable.name, `%${filter.companyName}%`)
      )
    ).as('byCompanyName');

  const byMinSalary = db.select()
    .from(byCompanyName)
    .where(gte(byCompanyName.jobsTable.minSalary, filter.minSalary)).as('byMinSalary');

  const byMaxSalary = db.select()
    .from(byMinSalary)
    .where(lte(byMinSalary.jobsTable.maxSalary, filter.maxSalary)).as('byMaxSalary');

  const byJobType = db.select()
    .from(byMaxSalary)
    .where(like(byMaxSalary.jobsTable.jobType, `%${filter.jobType}%`)).as('byJobType');

  const byContractType = db.select()
    .from(byJobType)
    .where(like(byJobType.jobsTable.contractType, `%${filter.contractType}%`)).as('byContractType');

  const byCity = db.select()
    .from(byContractType)
    .where(like(byContractType.jobsTable.city, `%${filter.city}%`));

  return byCity;
  // shouldn't length be also calculated from this then?
}

type Job = {
  id: number
  city: string
  title: string
  description: string
  byCompanyId: number
  createdAt: string
  isClosed: boolean
  contractType: string
  workhourType: string
  jobType: string
  minSalary: number
  maxSalary: number
}
