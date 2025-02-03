import { getUserId } from "@/app/lib/session";
import { getAllJobsForLoggedUserWithCompanyInfo, getAllJobsWithCompanyInfo } from "@/db/queries/select"

export async function GET() {
  const userId: number = await getUserId();
  let offers;
  if (userId !== -1) {
    console.log("Logged in fr", userId);
    offers = await getAllJobsForLoggedUserWithCompanyInfo(userId);
  }
  else {
    offers = await getAllJobsWithCompanyInfo();
    console.log("not logged in fr");
  }

  console.log(offers);
  return Response.json({ offers: offers }, { status: 200 })
}
