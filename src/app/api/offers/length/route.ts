import { MAX_JOBS_PER_PAGE } from "@/app/lib/definitions";
import { getJobsMaxPages } from "@/db/queries/select";

export async function GET() {
  const [{ count }] = await getJobsMaxPages();
  return Response.json(
    { count: Math.ceil(count / MAX_JOBS_PER_PAGE) },
    { status: 200 }
  )
}
