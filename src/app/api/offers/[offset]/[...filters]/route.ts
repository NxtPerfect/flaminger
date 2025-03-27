import { CompaniesTable, Filter, JobsTable, JobsToUsersTable, langReturnData, MAX_JOBS_PER_PAGE, techReturnData } from "@/app/lib/definitions";
import { getUserId } from "@/app/lib/session";
import { getCountFilteredJobs, getHumanLanguagesForMultipleIds, getJobsFiltered, getTechnologiesForMultipleIds } from "@/db/queries/select"

type FilteredJobs = {
  jobsTable: JobsTable
  companiesTable: CompaniesTable
  jobsToUsersTable?: JobsToUsersTable | null | undefined
}

export async function GET(_req: Request, { params }: { params: Promise<{ offset: string, filters: string[] }> }) {
  const userId: number = await getUserId();
  const { offset, ...filters } = await params;
  const parsedFilter = getParsedFilters(filters.filters);

  if (!offset) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  const parsedOffset = Number.parseInt(offset[0]) - 1;

  const offers = await getJobsFiltered(userId, parsedOffset, parsedFilter);
  const [{ count }] = await getCountFilteredJobs(userId, parsedFilter);
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

function getParsedFilters(arr: string[]) {
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
  const FILTER_KEY_COUNT = getKeyCount(sampleFilter);
  if (arr.length !== FILTER_KEY_COUNT) {
    console.error(`Not enough arguments for filter. Expected ${FILTER_KEY_COUNT}, got ${arr.length}, fallback to default filter.`);
    return sampleFilter;
  }

  const filter: Filter = {
    ...sampleFilter,
    title: arr[0] === "any" ? "" : arr[0],
    companyName: arr[1] === "any" ? "" : arr[1],
    minSalary: Number.parseInt(arr[2]),
    maxSalary: Number.parseInt(arr[3]),
    jobType: arr[4] === "any" ? "" : arr[4],
    workhourType: arr[5] === "any" ? "" : arr[5],
    contractType: arr[6] === "any" ? "" : arr[6],
    city: arr[7] === "any" ? "" : arr[7]
  }

  return filter;
}

function getKeyCount<T extends object>(obj: T): number {
  return Object.keys(obj).length;
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
