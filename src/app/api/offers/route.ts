import { CompaniesTable, Filter, HumanLanguage, JobsTable, JobsToUsersTable, langReturnData, MAX_JOBS_PER_PAGE, Technology, techReturnData } from "@/app/lib/definitions";
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
    city: "",
    technologies: [],
    humanLanguages: []
  }
  const techName = queryParams.getAll("technology").length === 0 ? [] : queryParams.getAll("technology");
  const techExperience = queryParams.getAll("experience").length === 0 ? [] : queryParams.getAll("experience");
  const technologies = techName.map((tn, index) => ({ name: tn, experience: techExperience[index] }) as Technology);

  const langName = queryParams.getAll("language").length === 0 ? [] : queryParams.getAll("language");
  const langLevel = queryParams.getAll("level").length === 0 ? [] : queryParams.getAll("level");
  const humanLanguages = langName.map((ln, index) => ({ name: ln, level: langLevel[index] }) as HumanLanguage);

  const filter: Filter = {
    ...sampleFilter,
    title: queryParams.get("title") ?? "",
    companyName: queryParams.get("companyName") ?? "",
    minSalary: Number.parseInt(queryParams.get("minSalary") ?? "0"),
    maxSalary: Number.parseInt(queryParams.get("maxSalary") ?? "999999"),
    jobType: queryParams.getAll("jobType").length === 0 ? [] : queryParams.getAll("jobType"),
    workhourType: queryParams.getAll("workhourType").length === 0 ? [] : queryParams.getAll("workhourType"),
    contractType: queryParams.getAll("contractType").length === 0 ? [] : queryParams.getAll("contractType"),
    city: queryParams.get("city") ?? "",
    technologies: technologies,
    humanLanguages: humanLanguages,
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
