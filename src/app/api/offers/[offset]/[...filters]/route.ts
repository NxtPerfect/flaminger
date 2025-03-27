import { Filter } from "@/app/lib/definitions";
import { getUserId } from "@/app/lib/session";
import { getJobsFiltered } from "@/db/queries/select"

export async function GET(req: Request, { params }: { params: Promise<{ offset: string, filters: string[] }> }) {
  const userId: number = await getUserId();
  const { offset, ...filters } = await params;
  const parsedFilter = getParsedFilters(filters.filters);
  console.log(parsedFilter);

  if (!offset) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  const parsedOffset = Number.parseInt(offset[0]) - 1;

  const offers = await getJobsFiltered(userId, parsedOffset, parsedFilter);
  console.log(offers);

  // return Response.json({
  //   offers,
  //   tech: combinedTech ?? [],
  //   langs: combinedLang ?? []
  // },
  //   { status: 200 }
  // );
  return Response.json({ offers }, { status: 200 });
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
    console.error(`Not enough arguments for filter. Expected ${FILTER_KEY_COUNT}, got ${arr.length}`);
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
