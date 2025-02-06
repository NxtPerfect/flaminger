import { getUserId } from "@/app/lib/session";
import { getAllJobsForLoggedUserWithCompanyInfo, getAllJobsWithCompanyInfo } from "@/db/queries/select"

export async function GET() {
  const userId: number = await getUserId();
  let offers;
  if (userId !== -1) {
    offers = await getAllJobsForLoggedUserWithCompanyInfo(userId);
  }
  else {
    offers = await getAllJobsWithCompanyInfo();
  }

  // console.log(offers);
  return Response.json({ offers }, { status: 200 })
}
