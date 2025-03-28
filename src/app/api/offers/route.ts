import { CompaniesTable, Filter, JobsTable, JobsToUsersTable, langReturnData, MAX_JOBS_PER_PAGE, techReturnData } from "@/app/lib/definitions";
import { getUserId } from "@/app/lib/session";
import { getCountFilteredJobs, getHumanLanguagesForMultipleIds, getJobsFiltered, getTechnologiesForMultipleIds } from "@/db/queries/select"
import { NextRequest } from "next/server";

type FilteredJobs = {
  jobsTable: JobsTable
  companiesTable: CompaniesTable
  jobsToUsersTable?: JobsToUsersTable | null | undefined
}

export async function GET(req: NextRequest) {
  const userId: number = await getUserId();
  const queryParams = req.nextUrl.searchParams;
  const { offset, filter } = getParsedFilters(queryParams);

  if (!offset) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  const parsedOffset = Number.parseInt(offset) - 1;

  const offers = await getJobsFiltered(userId, parsedOffset, filter);
  const [{ count }] = await getCountFilteredJobs(userId, filter);
  const uniqueOffersIds = getUniqueIds(offers);
  const tech = await getTechnologiesForMultipleIds(uniqueOffersIds);
  const lang = await getHumanLanguagesForMultipleIds(uniqueOffersIds);

  const combinedTech = combineTechnologiesOfSameJobId(tech, uniqueOffersIds);
  const combinedLang = combineHumanLanguagesOfSameJobId(lang, uniqueOffersIds);

  return Response.json({
    offers: offers,
    tech: combinedTech ?? [],
    lang: combinedLang ?? [],
    count: Math.ceil(count / MAX_JOBS_PER_PAGE)
  },
    { status: 200 });
}

function getParsedFilters(queryParams: URLSearchParams) {
  const sampleFilter = {
    title: "",
    companyName: "",
    minSalary: 0,
    maxSalary: 999999,
    jobType: "",
    workhourType: "",
    contractType: "",
    city: ""
  }

  const filter: Filter = {
    ...sampleFilter,
    title: queryParams.get("title") ?? "",
    companyName: queryParams.get("companyName") ?? "",
    minSalary: Number.parseInt(queryParams.get("minSalary") ?? "0"),
    maxSalary: Number.parseInt(queryParams.get("maxSalary") ?? "999999"),
    jobType: queryParams.getAll("jobType").length === 0 ? [] : queryParams.getAll("jobType"),
    workhourType: queryParams.getAll("workhourType").length === 0 ? [] : queryParams.getAll("workhourType"),
    contractType: queryParams.getAll("contractType").length === 0 ? [] : queryParams.getAll("contractType"),
    city: queryParams.get("city") ?? ""
  }

  return { offset: queryParams.get("page") ?? "1", filter: filter };
}

function getUniqueIds(offers: FilteredJobs[]) {
  const uniqueIds: number[] = [];
  for (let i = 0; i < offers.length; i++) {
    if (!uniqueIds.some((id) => offers[i].jobsTable!.id === id)) {
      uniqueIds.push(offers[i].jobsTable!.id);
    }
  }
  return uniqueIds;
}

function combineTechnologiesOfSameJobId(tech: techReturnData[], uniqueIds: number[]) {
  const combinedTech = [];
  for (let i = 0; i < uniqueIds.length; i++) {
    const arr = tech.filter((t) =>
      t.jobId === uniqueIds[i]
    )
      .map((t) => {
        return {
          name: t.name,
          experience: t.experience
        }
      });

    combinedTech.push({
      jobId: uniqueIds[i],
      tech: arr
    });
  }

  return combinedTech;
}

function combineHumanLanguagesOfSameJobId(lang: langReturnData[], uniqueIds: number[]) {
  const combinedLang = [];
  for (let i = 0; i < uniqueIds.length; i++) {
    const arr = lang.filter((l) =>
      l.jobId === uniqueIds[i]
    )
      .map((l) => {
        return { name: l.name, level: l.level };
      })
    combinedLang.push({
      jobId: uniqueIds[i],
      langs: arr
    });
  }
  return combinedLang;
}
