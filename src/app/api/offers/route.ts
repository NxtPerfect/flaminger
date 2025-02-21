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
  // // get all unique id's of jobs
  // // combine jobId with array of techs
  // const tech = await getTechnologiesForAllJobs();
  // let uniqueIds: number[] = [];
  // for (let i = 0; i < tech.length; i++) {
  //   if (!uniqueIds.some((id) => tech[i].jobId === id)) {
  //     uniqueIds.push(tech[i].jobId);
  //   }
  // }
  //
  // const combinedTech: { jobId: number, tech: { name: string, experience: string }[] }[] = [];
  // for (let i = 0; i < uniqueIds.length; i++) {
  //   const arr = tech.map((t) => {
  //     if (t.jobId === uniqueIds[i]) {
  //       uniqueIds.push(t.jobId);
  //     }
  //   })
  //   combinedTech.push({ jobId: uniqueIds[i], tech: [{ name: "yes", experience: "yes" }] });
  // }
  // // combine jobId with array of langs
  // const langs = await getHumanLanguagesForAllJobs();
  //
  return Response.json({ offers }, { status: 200 })
}
