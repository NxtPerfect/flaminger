import { getAllJobs } from "@/db/queries/select"

export async function GET(req: Request, res: Response) {
  const offers = await getAllJobs();
  return Response.json({data: offers}, {status:200})
}
